<template>
  <div id="app" :class='layout'>
    <h1>{{ msg }}</h1>
    <div class="row">
      <div class="col-sm-12">
        <button 
          :class="[layout === 'day' ? 'btn btn-dark float-left ml-3' : 'btn btn-light float-left ml-3']"
          v-on:click='toggleLayout'>
          change layout
        </button>
        
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
    <div class="row justify-content-sm-center">
      <contact-details
        class="col-sm-10" 
        v-if="activeContact !== null"
        :contact='activeContact'
        @onEditContact='editContact'></contact-details>
      <add-contact 
        class="col-sm-10"
        v-if="addFormVisible"
        @onAddContact='addContact'
        :newContact='contactToEdit'
        :editMode='editMode'></add-contact>
      <contact-list 
        class="col-sm-10"
        :contacts='contacts'
        :allContacts='allContacts'
        :recordsOnPage='recordsOnPage'
        @onContactSelect='setActiveContact'
        @removeContact='removeContact'
        @sortBy='sortList'
        @onSearch='onSearch'></contact-list>
    </div>
  </div>
</template>

<script>
import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetails';
import AddContact from './components/AddContact';
import SearchBar from './components/SearchBar';
import axios from 'axios';

export default {
  name: 'app',
  components: {
    ContactList,
    ContactDetails,
    AddContact,
    SearchBar
  },
  data () {
    return {
      layout: 'day',
      msg: 'Welcome to Vue Phone Book',
      addFormVisible: false,
      editMode: false,
      contacts: [],
      activeContact: null,
      contactToEdit: {},
      activeContactIndex: null,
      allContacts: [], 
      sortedAscBy: {
        name: false,
        surname: false
      },
      recordsOnPage: 10
    }
  },
  mounted() {
    axios.get('https://uinames.com/api/?ext&amount=100')
      .then(response => {
        this.allContacts = [...response.data];
        this.contacts = [...response.data];
      })
      .catch(e => {
        // this.errors.push(e)
        console.log('error!!')
      })
  },
  methods: {
    setActiveContact(contact) {
      this.addFormVisible = false;
      this.activeContact = contact;
      this.activeContactIndex = this.allContacts.indexOf(contact);
    },

    removeContact(contact) {
      let contactToRemoveIndex = this.allContacts.indexOf(contact);
      this.allContacts.splice(contactToRemoveIndex, 1);
      this.contacts = [...this.allContacts];
      this.activeContact = null;
    },

    addContact(contact) {
      if (!this.editMode) {
        this.allContacts.push(contact);
      } else {
        this.allContacts.splice(this.activeContactIndex, 1, {...contact})
      }
      this.contacts = [...this.allContacts];
      this.setAddFormHidden();
      this.editMode = false;
    },

    setAddFormVisible() {
      this.addFormVisible = true;
      this.activeContact = null;
      this.contactToEdit = {};
      this.editMode = false;
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
    },

    onSearch(results) {
      this.contacts = results;
    },

    sortList(field) {
      // when no search, sort whole array and then make new pagination
      // when search is performed sort only search results and make new pagination for it
      let listToSort = this.contacts.length === this.allContacts.length ? [...this.allContacts] : [...this.contacts]; 
      let sortedList = listToSort.sort((a, b) => a[field].localeCompare(b[field]));
      if (this.sortedAscBy[field]) {
        sortedList = sortedList.reverse();
      }
      this.contacts = sortedList;
      this.sortedAscBy[field] = !this.sortedAscBy[field];
    },

    toggleLayout() {
      switch (this.layout) {
        case 'day':
         this.layout = 'night';
         break;
        case 'night':
          this.layout = 'day';
          break;
        default:
          this.layout = 'day';
      }
      
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
