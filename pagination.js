export default{
    props:['page'],
    template:
    ` <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" :class="{'disabled':page.current_page===1}">
            <a class="page-link" href="#" @click="$emit('getPage',page.current_page-1)">Previous</a></li>
            <li class="page-item" v-for="item in page.total_pages" :key="item"
            :class="{'active':page.current_page===item}">
            <a class="page-link" href="#" @click="$emit('getPage',item)">{{item}}</a></li>
            <li class="page-item" :class="{disabled:page.current_page===page.total_pages}">
            <a class="page-link" href="#" @click="$emit('getPage',page.current_page+1)">Next</a></li>
        </ul>
        </nav>
    `
}