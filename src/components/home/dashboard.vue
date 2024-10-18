<template>
  <v-container class="main" :fluid="side">
    <v-card class="name">
      <v-card-title>{{ $t('Dashboard') }}</v-card-title>
      <v-card-subtitle>{{ time }}</v-card-subtitle>
    </v-card>
    <v-row class="chart">
  <v-col cols="6">
    <v-divider :thickness="30" color="divider"></v-divider>
    <v-card :title="$t('Employee Details')">
      <v-divider class="border-opacity-75" />
      <div class="canvas">
        <canvas ref="myChart"></canvas>
      </div>
    </v-card>
  </v-col>
  <v-col cols="6">
    <v-divider :thickness="30" color="divider"></v-divider>
    <v-card :title="$t('Attendence Details')">
      <v-divider class="border-opacity-75" />
      <div class="canvas2">
        <canvas ref="myChart2"></canvas>
      </div>
    </v-card>
  </v-col>

</v-row>
    <v-divider :thickness="20" color="divider"></v-divider>
    <v-card :title="$t(`Today's Attendance`)">
      <template v-slot:append>
        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" color="primary"  variant="flat" @click="subChild1">{{$t('View All')}}</v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card :title="$t('Attendance List')">
              <v-data-table-virtual :items="item[0]" height="500"></v-data-table-virtual>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :text="$t('cancel')" @click="isActive.value = false, removeD()"></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </template>
      <v-divider class="border-opacity-75"></v-divider>
      <v-card-text >{{ $t('Check-In') }} : {{ attendence.checkin }}</v-card-text>
      <v-card-text>{{ $t('Check-Out') }} : {{ attendence.checkout }}</v-card-text>
      <v-list></v-list>
    </v-card>
    <v-divider :thickness="20" color="divider"></v-divider>
    <v-card :title="$t('Employee List')">
      <template v-slot:append>
        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" color="primary"  variant="flat" @click="subChild2">{{$t('View All')}}</v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card :title="$t('Employee List')">
              <v-col cols="7">
              <v-text-field  v-model="search"  :label="$t('search')" prepend-inner-icon="mdi-magnify"></v-text-field></v-col>
              <v-data-table-virtual :items="emp" height="500" :search="search">
              </v-data-table-virtual>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :text="$t('cancel')" @click="isActive.value = false, removeD()"></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </template>
      <v-divider class="border-opacity-75"></v-divider>
      <v-data-table-virtual :items="dash" height="200" ></v-data-table-virtual>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'dashboardContent',
  props: ['side'],
  data() {
    return {
      time: new Date().toLocaleDateString(),
      showChild: null,
      search: null,
      item: [],
      emp: [],
      dash: [],
      onlyUser: [],
      chart: null,
      chart2: null,
      data: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
          label: this.$t('Working Hours'),
          data: [0, 8, 8, 7, 8, 5, 0],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(201, 203, 207, 0.2)'],
          borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
          borderWidth: 1
        }]
      },
      chartData: {
        labels: ['Developer', 'Designer', 'HR', 'Sales', 'Tester'],
        datasets: [{
          label: 'Count',
          data: [0, 0, 0, 0, 0], // Initialize with zero
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)'],
          borderColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        }]
      }
    };
  },
  computed: {
    ...mapState(['attendence', 'username'])
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.myChart.getContext('2d');
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: this.chartData,
        options: {
          responsive: true
        },
      });
    },
    renderChart2() {
      const ctx = this.$refs.myChart2.getContext('2d');
      if (this.chart2) {
        this.chart2.destroy();
      }
      this.chart2 = new Chart(ctx, {
        type: 'bar',
        data: this.data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },

    async subChild1() {
      if (this.username === "Ajeesh") {
        try {
          const response = await this.axios.get('http://localhost:3000/attendence');
          this.item1 = response.data.map(element => ({
            name: element.username,
            In: element.In,
            Out: element.Out,
            date: element.date
          }));
          this.item.push(this.item1);
        } catch (error) {
          console.error(error);
        }
      } else {
        try {

          const response = await this.axios.get('http://localhost:3000/attendence');
          console.log('response',response);

          this.specific = response.data.filter(element => element.username === this.username);
          this.item.push(this.specific);
        } catch (error) {
          console.error(error);
        }
      }
    },

    async subChild2() {
      try {
        const response = await this.axios.get('http://localhost:3000/signup');
        this.emp = response.data.map(user => ({
          Name: user.name,
          ID: user.id,
          Role: user.role
        }));
      } catch (error) {
        console.error(error);
      }
    },

    removeD() {
      this.item = [];
      this.emp = [];
      this.onlyUser = [];
    },

    async fetchEmployeeRoles() {
      try {
        const response = await this.axios.get('http://localhost:3000/signup');
        const roles = response.data.map(user => user.role);
        this.chartData.datasets[0].data = [
          roles.filter(role => role === 'Developer').length,
          roles.filter(role => role === 'Designer').length,
          roles.filter(role => role === 'HR').length,
          roles.filter(role => role === 'Sales').length,
          roles.filter(role => role === 'Tester').length
        ];
        this.renderChart();
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.renderChart();
    this.renderChart2();
  },
  beforeMount() {
    this.fetchEmployeeRoles();
  },
  async created(){
    try {
        const response = await this.axios.get('http://localhost:3000/signup');
        this.dash = response.data.map(user => ({
          Name: user.name,
          ID: user.id,
          Role: user.role
        }));
      } catch (error) {
        console.error(error);
      }

  }
};

</script>

<style scoped>
.details {
  display: flex;
}

canvas {
  max-width: fit-content;
}

.canvas {
  width:250px;
  margin:0 auto;
  padding:10px;

}

.canvas2 {
  width: 500px;
  padding:10px;

}
</style>
