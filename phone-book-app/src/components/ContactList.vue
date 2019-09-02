<template>
    <div class="row">
        <div class="col-sm-12" v-if='visibleRecords && visibleRecords.length'>
            <h1>List</h1>
            <div class="form-row">
                <div class="col"><button class="btn btn-secondary" v-on:click='prevPage'>Prev Page</button></div>
                <div class="col"><p>{{ this.activePage }} / {{ this.pagesNumber }}</p></div>
                <div class="col"><button class="btn btn-secondary" v-on:click='nextPage'>Next Page</button></div>
            </div>
            <ul class="list-group">
                <li>
                    <div class="row">
                        <div class="col-sm-1"></div>
                        <div v-on:click='sort("name")' class="col-sm-4">Name</div>
                        <div v-on:click='sort("surname")' class="col-sm-4">Surname</div>
                        <div class="col-sm-3">Phone</div>
                    </div>
                </li>
                <li class="list-group-item" v-for='(contact, index) in visibleRecords' 
                    :key='index' 
                    v-on:click='showDetails(contact, $event)'>
                    <contact-list-item :contact='contact'
                        @removeContact='onRemoveClicked'></contact-list-item>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import ContactListItem from './ContactListItem';

export default {
    name: 'ContactList',
    props: ['contacts', 'recordsOnPage'],
    components: {
        ContactListItem
    },
    data() {
        return {
            activePage: 1
        }
    },
    computed: {
        visibleRecords: function() {
            return [...this.contacts].slice((this.activePage -1) * this.recordsOnPage, this.activePage * this.recordsOnPage);
        },
        pagesNumber: function() {
            return Math.ceil(this.contacts.length / this.recordsOnPage);
        }
    },
    methods: {
        showDetails(contact, evt) {
            this.$emit('onContactSelect', contact);
        },

        onRemoveClicked(contact) {
            this.$emit('removeContact', contact);
        },

        sort(field) {
            this.$emit('sortBy', field);
        },

        nextPage() {
            if (this.activePage < this.pagesNumber) {
                this.activePage++;
            }
        },

        prevPage() {
            if (this.activePage > 1) {
                this.activePage--;
            }
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '../assets/contactList.scss';
</style>
