<template>
    <div>
        <p>add contact</p>
        <input v-model='newContact.name' type="text" placeholder="type name">
        <input v-model='newContact.phone' type="text" placeholder="type phone number">
        <button v-on:click='addContact' class="btn btn-primary">Add</button>
    </div>
</template>

<script>
export default {
    name: 'AddContact',
    data() {
        return {
            newContact: {}
        }
    },
    methods: {
        addContact() {
            if (this.newContact.name && this.newContact.phone) {
                this.$emit('onAddContact', this.newContact);
                this.clearForm();
            } else {
                console.log('fill name and phone!')
            }
        },

        clearForm() {
            this.newContact = {}
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '../assets/addContact.scss';
</style>