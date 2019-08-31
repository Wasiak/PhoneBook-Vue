<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <div class="row">
      <contact-list 
        class="col-sm-6"
        :contacts='contacts' 
        @onContactSelect='setActiveContact'
        @removeContact='removeContact'></contact-list>
      <contact-details
        class="col-sm-6" 
        v-if="this.activeContact !== null"
        :contact='activeContact'></contact-details>
      <add-contact @onAddContact='addContact'></add-contact>
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
      activeContact: null
    }
  },
  methods: {
    setActiveContact(contact) {
      this.activeContact = contact;
    },
    removeContact(contact) {
      let contactToRemoveIndex = this.contacts.indexOf(contact);
      this.contacts.splice(contactToRemoveIndex, 1);
    },
    addContact(contact) {
      this.contacts.push(contact);
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
