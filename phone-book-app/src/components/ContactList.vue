<template>
    <div class="row">
        <div class="col-sm-12" v-if='contacts && contacts.length'>
            <h1>List</h1>
            <ul class="list-group">
                <li>
                    <contact-list-item :header="true" 
                        :contact="{name: 'Name', phone: 'Phone', email: 'Email'}"></contact-list-item>
                </li>
                <li class="list-group-item" v-for='(contact, index) in contacts' 
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
    props: ['contacts'],
    components: {
        ContactListItem
    },
    data() {
        return {
            //
        }
    },
    methods: {
        showDetails(contact, evt) {
            this.$emit('onContactSelect', contact);
        },
        onRemoveClicked(contact) {
            this.$emit('removeContact', contact);
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '../assets/contactList.scss';
</style>
