<template>
  <v-container class="main" :fluid=side>
    <v-card class="name">
      <v-card-title>{{ $t('Holiday') }}</v-card-title>
    </v-card>
    <v-divider :thickness="20" color="divider"></v-divider>
    <v-row>
      <v-col>
        <v-sheet>
          <v-calendar color="green" :events="events"></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'holidayPage',
  props: ['side'],

  data() {
    return {
      events: [{
        title: 'Diwali', start: new Date('2024-10-30 00:00'),
        end: new Date('2024-10-30 23:00'), color: 'primary'
      }, {
        title: 'Ghandhi porandhanaal', start: new Date('2024-10-02 00:00'),
        end: new Date('2024-10-02 23:00'), color: 'primary'
      }
      ]
    }
  },
}
</script>
