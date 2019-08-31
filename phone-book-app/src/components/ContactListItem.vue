<template>
    <div class="row">
        <div class="col-sm-1">
            <button 
                v-if="!header"
                class="btn btn-danger"
                v-on:click='onRemoveClick($event)'>X</button>
        </div>
        <div class="col-sm-4">{{ contact.name }}</div>
        <div class="col-sm-3">{{ contact.phone }}</div>
        <div class="col-sm-4">{{ contact.email }}</div>
    </div>
</template>

<script>
export default {
    name: 'ContactList',
    props: ['contact', 'header'],
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