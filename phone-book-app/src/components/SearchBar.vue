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
            console.log('search bar contacts = ', this.contacts)
            let filteredData = this.contacts.filter(contact => contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
            console.log('search bar, search func; search term = ', this.searchTerm);
            this.onSearch(filteredData);
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '../assets/searchBar.scss';
</style>