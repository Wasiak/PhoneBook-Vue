<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <div class="row">
      <div class="col-sm-12">
        <search-bar 
          :contacts='allContacts'
          @onSearch='onSearch'></search-bar>
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
        :recordsOnPage='recordsOnPage'
        @onContactSelect='setActiveContact'
        @removeContact='removeContact'
        @sortBy='sortList'></contact-list>
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
import SearchBar from './components/SearchBar';

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
      msg: 'Welcome to Vue Phone Book',
      addFormVisible: false,
      editMode: false,
      contacts: [
          {
            name: 'Joe',
            surname: 'Smith',
            phone: 123456789,
            address: 'test street 6/23 Warsaw'
          },
          {
            name: 'Tom',
            surname: 'Bombadil',
            phone: 555666777,
            email: 'test@test.com',
            age: 29,
            gender: 'male',
            region: 'Poland',
            title: 'mr',
            birthday: {
              dmy: '29/04/1990'
            }
          },
          {
            name: 'Ηριδανός',
            surname: 'δαν',
            phone: 888
          },
          {
            name: 'Jim',
            surname: 'Jones',
            phone: 666111000,
            email: 'mail@test.com',
            age: 45
          },
          {
            name: 'Bob',
            surname: 'Budowniczy',
            phone: 999000999
          },
          {
            name: 'Rareș',
            surname: 'Rod',
            phone: 987654321
          },
          {
            name: 'δανόςΗρι',
            surname: 'δανιΗ',
            phone: 888
          },
          {
            name: 'ριΗδανός',
            surname: 'δανι',
            phone: 888
          },
          {
            name: 'Ángela',
            surname: 'Zet',
            phone: 45567
          },
        
          {
            name: 'جمانة',
            surname: 'جمان',
            phone: 890765
          }
        ],
      activeContact: null,
      contactToEdit: {},
      activeContactIndex: null,
      //
      allContacts: [
          {
            name: 'Joe',
            surname: 'Smith',
            phone: 123456789,
            address: 'test street 6/23 Warsaw'
          },
          {
            name: 'Tom',
            surname: 'Bombadil',
            phone: 555666777,
            email: 'test@test.com',
            age: 29,
            gender: 'male',
            region: 'Poland',
            title: 'mr',
            birthday: {
              dmy: '29/04/1990'
            }
          },
          {
            name: 'Ηριδανός',
            surname: 'δαν',
            phone: 888
          },
          {
            name: 'Jim',
            surname: 'Jones',
            phone: 666111000,
            email: 'mail@test.com',
            age: 45
          },
          {
            name: 'Bob',
            surname: 'Budowniczy',
            phone: 999000999
          },
          {
            name: 'Rareș',
            surname: 'Rod',
            phone: 987654321
          },
          {
            name: 'δανόςΗρι',
            surname: 'δανιΗ',
            phone: 888
          },
          {
            name: 'ριΗδανός',
            surname: 'δανι',
            phone: 888
          },
          {
            name: 'Ángela',
            surname: 'Zet',
            phone: 45567
          },
          {
            name: 'جمانة',
            surname: 'جمان',
            phone: 890765
          }
        ],
        //
        sortedAscBy: {
          name: false,
          surname: false
        },
        recordsOnPage: 4
    }
  },
  computed: {
    // allContacts: function() {
    //   return [...this.contacts]
    // }
    // here some pagination probably contactsToShow
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
