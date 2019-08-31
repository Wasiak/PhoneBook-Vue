<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <div class="row">
      <div class="col-sm-12">
        <button 
          class="btn btn-primary float-right mr-3"
          v-on:click='setAddFormVisible'
          v-if='!addFormVisible'>Add New Contact</button>
          <button 
          class="btn btn-primary float-right mr-3"
          v-on:click='setAddFormHidden'
          v-if='addFormVisible'>Cancel</button>
      </div> 
    </div>
    <div class="row">
      <contact-list 
        class="col-sm-6"
        :contacts='contacts' 
        @onContactSelect='setActiveContact'
        @removeContact='removeContact'></contact-list>
      <contact-details
        class="col-sm-6" 
        v-if="activeContact !== null"
        :contact='activeContact'
        @onEditContact='editContact'></contact-details>
      <add-contact 
        v-if="addFormVisible"
        @onAddContact='addContact'
        :newContact='contactToEdit'
        :editMode='editMode'></add-contact>
    </div>
  </div>
</template>

<script>
import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetails';
import AddContact from './components/AddContact';

export default {
  name: 'app',
  components: {
    ContactList,
    ContactDetails,
    AddContact
  },
  data () {
    return {
      msg: 'Welcome to Vue Phone Book',
      addFormVisible: false,
      editMode: false,
      contacts:  [
          {
            name: 'Joe',
            phone: 123456789,
            address: 'test street 6/23 Warsaw'
          },
          {
            name: 'Tom',
            phone: 555666777,
            email: 'test@test.com',
            address: 'elo street 3 NY',
            age: 23
          },
          {
            name: 'Jim',
            phone: 666111000,
            email: 'mail@test.com',
            age: 45
          },
          {
            name: 'Bob',
            phone: 999000999
          }
        ],
      activeContact: null,
      contactToEdit: {},
      activeContactIndex: null
    }
  },
  methods: {
    setActiveContact(contact) {
      this.addFormVisible = false;
      this.activeContact = contact;
      this.activeContactIndex = this.contacts.indexOf(contact);
      console.log('active contact index = ', this.activeContactIndex)
    },

    removeContact(contact) {
      let contactToRemoveIndex = this.contacts.indexOf(contact);
      this.contacts.splice(contactToRemoveIndex, 1);
    },

    addContact(contact) {
      if (!this.editMode) {
        this.contacts.push(contact);
      } else {
        console.log('cont to edit  = ', {...contact})
        // this.contactToEdit = contact;
        console.log('contact edited')
        this.contacts[this.activeContactIndex] = contact;
        console.log('contacts after edit = ', this.contacts)
      }
      this.setAddFormHidden();
    },

    setAddFormVisible() {
      this.addFormVisible = true;
      // this.setActiveContact(null);
      this.activeContact = null;
      this.contactToEdit = {};
    },

    setAddFormHidden() {
      this.addFormVisible  = false;
      this.contactToEdit = {};
    },

    editContact() {
      this.contactToEdit = {...this.activeContact};
      this.editMode = true;
      this.addFormVisible = true;
      this.activeContact = null;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
