<template>
    <div id='addContactContainer'>
        <h3>{{ editMode ? 'Edit Contact' : 'Add Contact' }}</h3>
        <form>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="name">Name:</label>
                <div class="col-sm-10">
                    <input class="form-control" v-model='newContact2.name' type="text" placeholder="type name">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="surname">Surname:</label>
                <div class="col-sm-10">
                    <input class="form-control" v-model='newContact2.surname' type="text" placeholder="type surname">
                </div>   
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="title">Title:</label>
                <div class="col-sm-10">
                    <input class="form-control" v-model='newContact2.title' type="text" placeholder="type title i.e. mr, mrs">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="phone">Phone:</label>
                <div class="col-sm-10">
                    <input class="form-control" v-model='newContact2.phone' type="text" placeholder="type phone number">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="gender">Gender:</label>
                <div class="col-sm-10">
                    <select class="form-control" v-model='newContact2.gender'>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="region">Region:</label>
                <div class="col-sm-10">
                    <input class="form-control" v-model='newContact2.region' type="text" placeholder="type region">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="age">Age:</label>
                <div class="col-sm-10">
                    <input min="0" step="1" class="form-control" v-model='newContact2.age' type="number" placeholder="type age">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="email">Email:</label>
                <div class="col-sm-10">
                    <input class="form-control" v-model='newContact2.email' placeholder="type email">
                </div>
            </div>
            <button type='button' v-on:click='addContact' class="btn btn-success">{{ editMode ? 'Save' : 'Add' }}</button>
            <div v-if="validationError !== ''" class="row error-message">
                <p>{{ validationError }}</p>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AddContact',
    props: ['newContact', 'editMode'],
    data() {
        return {
            newContact2: this.newContact,
            validationError: ''
        }
    },
    methods: {
        addContact() {
            this.validationError = '';
            const re = /\S+@\S+\.\S+/;
            if (this.newContact2.name && this.newContact2.surname && this.newContact2.phone) {
                if(this.newContact2.age && Number(this.newContact2.age) !== parseInt(this.newContact2.age)) {
                    this.validationError = 'Age must be integer.'
                } else if(this.newContact2.email && !re.test(this.newContact2.email)) {
                    this.validationError = 'Email format incorrect'
                } else {
                    this.$emit('onAddContact', this.newContact2);
                    this.clearForm();
                } 
            } else {
                this.validationError = 'Please fill Name, Surname and Phone.'
            }
        },

        clearForm() {
            this.newContact2 = {};
            this.validationError = '';
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '../assets/addContact.scss';
</style>