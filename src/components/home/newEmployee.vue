<template>
    <v-container class="main" :fluid=side>
        <v-card class="name">
            <v-card-title>{{ $t('New-Employee') }}</v-card-title>
        </v-card >
        <v-divider :thickness="20" color="divider"></v-divider>

       <v-data-table
       :items=item
       v-model="select"
       show-select
       >
        </v-data-table>
    </v-container>
</template>
<script>
export default {
    name:'newEmployee',
    props:['side'],

    data(){
        return{
            select:[],
           item:[{name:'Exampledata',role:'Developer'}]
        }
    },
}
</script>
