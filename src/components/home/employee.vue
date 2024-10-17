<template>
    <v-container class="main" :fluid=side>
        <v-card class="name" >
            <v-card-title>{{ $t('Employee') }}</v-card-title>
        </v-card >
        <v-divider :thickness="20" color="divider"></v-divider>

        <v-data-table
        :items="items"
        v-model="select"
        item-value="name"
        show-select
        >
            </v-data-table>
        </v-container>

</template>
<script>

export default {
    name:'employeeContent',
    props:['side'],

    data(){
        return{
            select:[],
            items:[]
        }
    },
    created(){
        this.axios
        .get('http://localhost:3000/signup')
        .then((response)=>{
        response.data.forEach(element => {
            const users={name:element.name,id:element.id,role:element.role,contact:element.email}
           this.items.push(users)
        });
            
        })
    },

}
</script>
