<template>
    <div id='contact-detail-container'>
        <h2>Contact Details</h2>
        <div>
            <div class="detail-line" v-if="contact.name">Name: {{ contact.name }}</div>
            <div class="detail-line" v-if="contact.phone">Phone: {{ contact.phone }}</div>
            <div class="detail-line" v-if="contact.email">Email: {{ contact.email }}</div>
            <div class="detail-line" v-if="contact.address">Address: {{ contact.address }}</div>
            <div class="detail-line" v-if="contact.age">Age: {{ contact.age }}</div>
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