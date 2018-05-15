<template>
  <div>
    <script id="editor" type="text/plain" ></script>
  </div>
</template>

<script>
import '../../../static/ueditor/ueditor.config.js'
import '../../../static/ueditor/ueditor.all.min.js'
import '../../../static/ueditor/lang/zh-cn/zh-cn.js'
// import '../../../static/ueditor/ueditor.parse.min.js'
export default {
  name: "UEditor",
  props: {
    id: {
      type: String
    },
    config: {
      type: Object
    }
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    //初始化UE
    const _this = this;
    this.editor = UE.delEditor("editor");
    this.editor = UE.getEditor("editor", this.config);
    // UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
    // UE.Editor.prototype.getActionUrl = function(action) {
    //   if (
    //     action == "uploadimage" ||
    //     action == "uploadscrawl" ||
    //     action == "uploadvideo"
    //   ) {
    //     return "uploadimage";
    //   } else {
    //     return this._bkGetActionUrl.call(this, action);
    //   }
    // };
  },
  destoryed() {
    this.editor.destory();
  },
  methods: {
    getUEContent: function() {
      return this.editor.getContent();
    },
    getContentTxt: function() {
      return this.editor.getContentTxt();
    }
  }
};
</script>
