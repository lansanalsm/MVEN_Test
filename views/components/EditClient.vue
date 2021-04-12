 <template>
  <div class="row justify-content-center">
      <div class="col-md-10">
           <h3>Edit client </h3>
          <div class='row bg_blue_ligth'>
               <div class="col-7 text-left">
                   <h4 class='text-primary'>Client </h4>
                </div>
                <div class="col-5 text-right">
                    <router-link to="/" class="btn btn-secondary btn-sm">Liste Client</router-link>
                </div>
         </div>

          <form @submit.prevent="updateClient" class='border_style'>
            <div class="form-group row">
                <label for="name" class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="name" v-model="client.name" placeholder="your name" required>
                </div>
            </div>
            <div class="form-group row">
                <label for="email" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="email" v-model="client.email"  placeholder="you@yourcompany.com" required>
                </div>
            </div>
            <div class="form-group row">
                <label for="phone" class="col-sm-2 col-form-label">Phone</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="phone" v-model="client.phone"  placeholder="+224 624 19 63 67" required>
                </div>
            </div>
            <div class="form-group row">
                <label for="provider" class="col-sm-2 col-form-label">Provider</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" id="provider" v-model="provider" placeholder="Provider name">
                </div>
                <div class="col-sm-4">
                    <a  v-on:click="addProvider" class="btn btn-secondary btn-sm">Add provider</a>
                </div>
            </div>
            <div class="form-group row justify-content-center">
                <div class="border_style">
                    <div v-for="(provider, index) in this.allProviders" :key="index">
                        <div>
                            <input 
                                v-bind:checked="myProvidersContains(provider._id)"
                                type='checkbox'
                                v-bind:id="provider._id"
                                v-on:click="toggleProvider" 
                                :data-value="provider._id" 
                            />
                        <label v-bind:for="provider._id" class='provider_name'> {{ provider.name }} </label>
                        <i class="bi bi-trash" v-on:click="deleteProvider" :data-value="provider._id" ></i>
                       </div>
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <div class="col-sm-12 text-right">
                    <hr>
                    <a to="/" v-on:click="gotoListClient" class="btn btn-secondary btn-sm btn-cancel">Cancel</a>
                    <input type='submit' value='Update' class="btn btn-primary btn-sm"/>
                </div>
            </div>
            </form>

      </div>
  </div>
 </template>
<style scoped>
    .border_style {
        border: 1px solid #ced4da;
        padding: 5px 7px;
    }
    .provider_name {
        margin:3px 5px;
    }
    .btn-cancel {
        margin-right: 10px !important;
    }
    .bg_blue_ligth {
     background-color: rgb(157, 235, 235);
     padding: 7px 2px;
 }

</style>
 <script>
  export default {
    data() {
        return {
          client: {},
          allProviders: [], // all providers stored in the db
          myProviders: [], // this client's providers
          provider: '' // for provider input field
        }
    },
    created() {
        // fetch client's data once component rendered
        let uri = `http://localhost:3000/clients/${this.$route.params.id}`;
        this.axios.get(uri).then((response) => {
            this.client = response.data
        });
        // then fetch providers
        this.fetchProviders()
      },
    methods: {
        fetchProviders () {
            var uri = 'http://localhost:3000/providers'
            this.axios.get(uri).then((response) => {
                this.allProviders = response.data
                this.myProviders = this.client.providers
            })
        },
      updateClient() {
          let uri = `http://localhost:3000/clients/${this.$route.params.id}`
          this.client.providers = this.myProviders
          this.axios.put(uri, this.client).then(() => {
            this.$router.push({name: 'home'})
          });
      },
      deleteProvider (event) {
        this.$confirm("Do you really want to delete this provider ?").then(() => {
            var provider_id = event.target.getAttribute('data-value')
            let uri = 'http://localhost:3000/providers/' + provider_id
            this.axios.delete(uri).then(() => {
                this.fetchProviders()
            })
        })
      },
      addProvider() {
          if (this.provider) {
              this.$confirm("Do you really want to add this provider ?").then(() => {
                var uri = 'http://localhost:3000/providers'
                this.axios.post(uri, {name: this.provider}).then(() => {
                })
                
                this.provider = ''
                this.fetchProviders()
            }) 
        }
      },
      toggleProvider(event) {
          var provider_id  = event.target.getAttribute('data-value')
          if(event.target.checked) {
             if (!this.myProviders.includes(provider_id)) {
                this.myProviders.push(provider_id)
            } 
          }else {
            const index = this.myProviders.indexOf(provider_id)
            if (index > -1) {
                this.myProviders.splice(index, 1)
            }
        }
      },
      gotoListClient () {
        this.$confirm("Do you really want leave this page ?").then(() => {
            this.$router.push({name: 'home'})
        });
      },
      myProvidersContains(item) {
        return this.myProviders.indexOf(item) > -1
       }
    }
  }

</script>
