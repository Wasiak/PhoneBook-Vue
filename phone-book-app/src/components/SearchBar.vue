<template>
    <input 
        v-model='searchTerm' 
        type="text" 
        placeholder="search"
        v-on:keyup='search'>
</template>

<script>
export default {
    name: 'SearchBar',
    props: ['contacts'],
    data() {
        return {
            searchTerm: '',
            result: []
        }
    },
    methods: {
        onSearch(result) {
            this.$emit('onSearch', result);
        },

        search() {
            let filteredData = this.contacts.filter(contact => {
                return contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    contact.surname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    contact.phone.toString().includes(this.searchTerm.toLowerCase());
            });
            this.onSearch(filteredData);
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '../assets/searchBar.scss';
</style>