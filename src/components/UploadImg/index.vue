<template>
  <div>
    <el-upload
      :file-list="fileList"
      action="#"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      list-type="picture-card"
      :http-request="onRequest"
      :limit="1"
      :class="fileList.length == 1 ? 'hide' : ''"
      class="custom-upload"
      :before-upload="beforeUpload"
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="previewImgDialog">
      <img width="100%" :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDZ0JSRFvUr10pY5RfheS4VlspdHwOf4b7',
  SecretKey: 'cCdv2zlMxQhmiV7XmprlU1OYZP3Wnsna'
})
console.log(cos)
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      previewImgDialog: false,
      imgUrl: '',
      loading: false
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
        this.loading = true
      cos.putObject(
        {
          Bucket: 'peach-31-1313341597' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          if (err || data.statusCode != 200) {
            console.log(err)
            return this.$message.error('上传图片失败，请重试')
          }
          //   console.log(err || data)
          this.$emit('onSuccess', { url: 'http://' + data.Location })
          this.loading = false
        }
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      ;(this.previewImgDialog = true), (this.imgUrl = file.url)
    },
    beforeUpload(file) {
      const acceptsType = ['image/jpeg', 'image/gif', 'image/jpg', 'image/png']
      if (!acceptsType.includes(file.type)) {
        this.$message.error(
          `文件上传类型只能是${acceptsType.join('或者')}格式图片`
        )
        return false
      }
      //限制上传的图片大小
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('选择的图片不能超过2mb')
      }
    }
  },

  computed: {}
}
</script>

<style lang="scss" scoped>
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
