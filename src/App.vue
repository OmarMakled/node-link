<template>
  <section class="section">
    <div class="container">
      <button
        class="button is-primary modal-button"
        data-target="modal"
        aria-haspopup="true"
        @click="showModal = true"
      >Add</button>
      <div id="d3"></div>
      <div class="modal" :class="{'is-active': showModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <div class="modal-card-body">
            <form-node :node="node" :parents="nodes" @refresh="refresh"></form-node>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="showModal = false"></button>
      </div>
    </div>
  </section>
</template>

<script>
import FormNode from "./components/FormNode.vue";
import api from "./api";
import d3 from "./d3";
import _ from "underscore";

export default {
  name: "app",
  components: {
    FormNode
  },
  data() {
    return {
      showModal: false,
      links: [],
      node: {
        name: "",
        parent: "",
        meta: [
          {
            key: "",
            value: ""
          }
        ]
      },
      nodes: {}
    };
  },
  created() {
    this.start();

    // listen for d3 on circle click to show modal
    this.$on("onCircleClick", id => {
      this.node = this.nodes[id];
      this.showModal = true;
    });
  },
  methods: {
    refresh() {
      // Todo don't refresh page
      location.reload();
    },
    start() {
      api
        .get()
        .then(response => (this.nodes = response.data))
        .then(() => this.getLinks())
        .then(() => d3.draw(this.nodes, this.links, this));
    },
    getLinks() {
      _.each(this.nodes, (e, i) => {
        e.id = i;
        this.links.push({
          source: this.nodes[i],
          target: this.nodes[e.parent] || this.nodes[i]
        });
      });
    }
  }
};
</script>
