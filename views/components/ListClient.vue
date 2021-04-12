<template>
  <div class="row justify-content-center">
      <div class="col-md-10">
          <h3>List of clients </h3>
          <div class='row bg_blue_ligth'>
               <div class="col-6">
                   <h4 class='text-primary'>Clients</h4>
                </div>
               <div class="col-6 text-right">
                    <router-link to="/create" class="btn btn-secondary btn-sm">New client</router-link>
                </div>
          </div>
          <table id="table" class='table table-hover'>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Providers</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="client in clients" :key="client._id">
                    
                  <td>{{ client.name }}</td>
                  <td>{{ client.email }}</td>
                  <td>{{ client.phone }}</td>
                  <td>
                  <span v-for="provider in client.providers" :key="provider">
                      {{provider}},
                  </span>
                  </td>
                  <td>
                        <router-link :to="{name: 'edit', params: { id: client._id }}" class='edit_link'> <i class="bi bi-pencil-square"></i>Edit</router-link>
                        <a class='text-danger' v-on:click="deleteClient" :data-value="client._id"><i class="bi bi-trash"></i>delete</a>
                  </td>
                </tr>
            </tbody>
            </table>
      </div>
  </div>
 </template>
 <style scoped>
 .bg_blue_ligth {
     background-color: rgb(157, 235, 235);
     padding: 7px 2px;
 }
 .edit_link {
     margin-right: 3px;
 }
 </style>

 <script>
   export default {
      data() {
        return {
          clients: [],
        }
      },
      created() {
        this.fetchClient()
    },
    methods: {
        fetchClient() {
            let uri = 'http://localhost:3000/clients'
            this.axios.get(uri).then(response => {
                this.clients = response.data
            });
        },
        deleteClient (event) {
            this.$confirm("Do you really want to delete this element ?").then(() => {
                var client_id = event.target.getAttribute('data-value')
                let uri = 'http://localhost:3000/clients/' + client_id
                this.axios.delete(uri).then(() => {
                    this.fetchClient()
                });

            });
        }
    }
  }
 </script>
