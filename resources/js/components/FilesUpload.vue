<template>
    <v-form ref="form"
            v-model="valid"
            readonly
    >
        <v-file-input
            v-model="files"
            accept="image/*"
            chips
            counter
            multiple
            show-size
            truncate-length="15"
        ></v-file-input>


        <v-file-input
            v-model="file"
            accept="image/*"
            chips
            counter
            show-size
            truncate-length="15"
        ></v-file-input>

        <v-btn
            :disabled="!valid"
            class="mr-4"
            color="success"
            @click="upload"
        >
            Upload
        </v-btn>
    </v-form>

</template>

<script>

export default {
    name: "FilesUpload",
    data() {
        return {
            files: [],
            file: [],
            valid: true,
        }
    },
    methods: {
        upload() {
            // this.$refs.form.validate()
            // let vm = this;

            let form = new FormData();
            this.files.forEach(file=>{
                form.append('files[]', file)
            })
            form.append('file', this.file)
            form.append('name', "Ernest Brayce")

            axios.post('/upload-files',form).then(res => {
                console.log(res)
            });

        },

        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
    }
}
</script>
