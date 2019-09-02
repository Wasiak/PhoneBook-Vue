<template>
    <div class="row">
        <div class="col-1">
            <button 
                class="btn btn-danger"
                v-on:click='onRemoveClick($event)'>X</button>
        </div>
        <div class="col-4">{{ contact.name }}</div>
        <div class="col-4">{{ contact.surname }}</div>
        <div class="col-3">{{ contact.phone }}</div>
    </div>
</template>

<script>
export default {
    name: 'ContactList',
    props: ['contact'],
    data() {
        return {
            //
        }
    },
    methods: {
        onRemoveClick(e) {
            e.stopPropagation();
            this.$emit('removeContact', this.contact);
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '../assets/contactListItem.scss';
</style>