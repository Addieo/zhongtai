<template>
  <div class="hello">
    <h1>预览</h1>
    <ul>
      <li v-for="item in items" :key="item.text">
        <span v-html="getItem(item)"></span>
      </li>
    </ul>
    <h1>编辑</h1>
    <div>
      文字 <input v-model="text" /> 类型
      <select v-model="type">
        <option>input</option>
        <option>textarea</option>
        <option>button</option>
        <option>image</option>
        <!-- 配置动态数据源类型 -->
        <option>http</option>
        <option>submit</option>
      </select>
      <button @click="addItem">添加</button> <br/>
      <button @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      items: [],
      type: '',
      text: '',
    }
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
    },
    addItem() {
      this.items.push({
        text: this.text,
        type: this.type
      })
    },
    submit() {
      // PUT /api/form/:id
      fetch('http://localhost:2333/api/form/1', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(this.items)
      }).then(res => {
        console.log(res);
      });
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
