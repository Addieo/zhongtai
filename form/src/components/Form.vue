<template>
  <div class="hello">
    <ul>
      <li v-for="item in items" :key="item.text">
        <span v-html="getItem(item)"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      items: [
        // { text: '姓名', type: 'input' },
        // { text: '详细地址', type: 'input' },
        // { text: '留言', type: 'textarea' },
        // { text: '提交', type: 'button' },
      ]
    }
  },
  created () {
    fetch('http://localhost:2333/api/form/1', {
      method: 'GET',
    }).then(res => {
      return res.json();
    }).then(data => {
      this.items = data;
    });
  },
  methods: {
    getItem(item) {
      switch(item.type) {
        case 'button':
          return `<button>${item.text}</button>`;
        case 'image':
          return `<img src="${item.text}" />`;
        default:
          return `${item.text} <${item.type} />`;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello li {
  display: block;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
