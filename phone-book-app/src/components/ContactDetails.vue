<template>
    <div id='contact-detail-container'>
        <h2>Contact Details</h2>
        <div>
            <div class="detail-line" v-if="contact.name">
                <h3>{{ this.fullName }}</h3>
            </div>
            <div class="detail-line" v-if="contact.phone">Phone: {{ contact.phone }}</div>
            <div class="detail-line" v-if="contact.gender">Gender: {{ contact.gender }}</div>
            <div class="detail-line" v-if="contact.region">Region: {{ contact.region }}</div>
            <div class="detail-line" v-if="contact.age">Age: {{ contact.age }}</div>
            <div class="detail-line" v-if="contact.email">Email: {{ contact.email }}</div>
            
        </div>
        <button class="btn btn-info" v-on:click='onEditClick'>Edit</button>
    </div>
</template>

<script>
export default {
    name: 'ContactDetails',
    props: ['contact'],
    data() {
        return {
            //
        }
    },
    computed: {
        fullName: function() {
            return `${this.contact.title} ${this.contact.name} ${this.contact.surname}`;
        }
    },
    methods: {
        onEditClick() {
            this.$emit('onEditContact');
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '../assets/contactDetails.scss';
</style>