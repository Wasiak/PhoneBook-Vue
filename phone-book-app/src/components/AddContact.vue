<template>
    <div>
        <p>{{ editMode ? 'Edit Contact' : 'Add Contact' }}</p>
        <form>
            <div class="form-group">
                <label for="name">Name:</label>
                <input v-model='newContact2.name' type="text" placeholder="type name">
            </div>
            <div class="from-group">
                <label for="phone">Phone:</label>
                <input v-model='newContact2.phone' type="text" placeholder="type phone number">
            </div>
            <button type='button' v-on:click='addContact' class="btn btn-success">Add</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AddContact',
    props: ['newContact', 'editMode'],
    data() {
        return {
            newContact2: this.newContact
        }
    },
    methods: {
        addContact() {
            // console.log('add new contact = ', this.newContact)
            if (this.newContact2.name && this.newContact2.phone) {
                this.$emit('onAddContact', this.newContact2);
                this.clearForm();
            } else {
                console.log('fill name and phone!')
            }
        },

        clearForm() {
            this.newContact2 = {}
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '../assets/addContact.scss';
</style>