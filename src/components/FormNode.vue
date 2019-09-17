<template>
  <form action>
    <div class="field">
      <div class="control">
        <label class="label">Name</label>
        <input class="input" type="text" v-model="form.name" placeholder="Name" />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label class="label">Parent</label>
        <div class="is-fullwidth select">
          <select v-model="form.parent">
            <option v-for="(parent, index) in parents" :value="index" :key="index">{{ parent.name }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <div class="field">
        <a href="#" @click="onAddMeta">&#43;</a>
      </div>
      <custom-meta
        v-for="(meta, index) in form.meta"
        :key="index"
        :meta="meta"
        @remove="onRemoveMeta($event)"
      ></custom-meta>
    </div>
    <div class="field">
      <div class="control">
        <button
          type="button"
          @click="onSave"
          class="button is-success is-outlined is-fullwidth"
        >Save</button>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button type="button" @click="onReset" class="button is-info is-outlined is-fullwidth">Reset</button>
      </div>
    </div>
    <div class="field" v-if="form.id">
      <div class="control">
        <button
          type="button"
          @click="onDelete"
          class="button is-danger is-outlined is-fullwidth"
        >Delete</button>
      </div>
    </div>
  </form>
</template>

<script>
import _ from "underscore";
import CustomMeta from "./CustomMeta.vue";
import api from "../api";

export default {
  props: ["node", "parents"],
  components: {
    CustomMeta
  },
  watch: {
    node: function(n, p) {
      this.form = n;
    }
  },
  data() {
    return {
      form: this.node
    };
  },
  methods: {
    onSave() {
      if (this.form.id) {
        api.update(this.form.id, this.form).then(() => this.$emit("refresh"));
      } else {
        api.add(this.form).then(() => this.$emit("refresh"));
      }
    },
    onRemoveMeta(el) {
      this.form.meta = _.filter(this.form.meta, node => node != el);
    },
    onAddMeta() {
      this.form.meta.push({
        key: "",
        value: ""
      });
    },
    onReset() {
      this.form = {
        name: "",
        parent: "",
        meta: [
          {
            key: "",
            value: ""
          }
        ]
      };
    },
    onDelete() {
      api.delete(this.form.id).then(() => this.$emit("refresh"));
    }
  }
};
</script>
