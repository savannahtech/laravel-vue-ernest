import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


function showErrorNotification(message = 'Something went wrong!', title = 'Oops...') {
    Vue.swal.fire({
        icon: 'error',
        title: title,
        text: message,
    })
}


export function loadSomething(param) {

    return new Promise(function (resolve, reject) {

        /* await axios.post('/logout',).then(() => {
             context.dispatch('loadUser')
         })*/

        /*alert("am loading something.");
        let data = {
            mode: "add-to-near-site",
            errorMessage:"",
            errorCode:"",
             url:"",

        }*/
        axios.post(param.url, param)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}


const store = new Vuex.Store({
    state: {
        theme: {
            primary: "green darken-3",

        },
        paginator: {
            nextPage: '',
            total: null,
            from: 1,
            to: 1,
        },
        searchStaffs: [],
        loaded: {
            ranks: false,
            staffs: false,
            specs: false,
            faculties: false,
            departments: false,
        },
        user: {
            is_admin: false,
            img_name: null
        },
        isError: false,
        error: {
            code: 0,
            message: "",
            param: {}
        },
        process: {
            login: 100,
            logout: 200,
            register: 300,

        },

        specializations: [],
        departments: [],
        faculties: [],
        ranks: [],
        staffs: [],
        genders: [],
    },
    mutations: {
        updateUser(state, user) {
            state.user = user;
        },
        updateGenders(state, genders) {
            state.genders = genders;
        },

        saveQueryResults(state, response) {
            state.searchStaffs = response.data.data;
            state.paginator.nextPage = response.data.next_page_url;
            state.paginator.from = response.data.from;
            state.paginator.to = response.data.to;
            state.paginator.total = response.data.total;

            response.data.data.forEach(dt=>{
                //Loop through the data and add it to staffs but make sure it does not exits
                let index = state.staffs.findIndex(st=>{
                    return parseInt(st.id) === parseInt(dt.id);
                })

                if (index === -1){
                    state.staffs.push(dt);
                }
            })

        },

        addNextData(state, response) {
            let data = response.data.data;

            state.paginator.from = response.data.from;
            state.paginator.to = response.data.to;
            state.paginator.nextPage = response.data.next_page_url;

            data.forEach(dt=>{
                //Loop through the data and add it to staffs but make sure it does not exits
                let index = state.staffs.findIndex(st=>{
                    return parseInt(st.id) === parseInt(dt.id);
                })

                if (index === -1){
                    state.staffs.push(dt);
                }

                state.searchStaffs.push(dt);
            })


        },

        //    For Faculty
        updateFaculties(state, faculties) {
            state.faculties = faculties;
        },
        addToFaculties(state, faculty) {
            state.faculties.push(faculty);
        },
        updateAFaculty(state, faculty) {
            let index = state.faculties.findIndex(spec => {
                return spec.id === faculty.id;
            });
            Object.assign(state.faculties[index], faculty);
        },
        removeAFaculty(state, id) {
            let index = state.faculties.findIndex(spec => {
                return spec.id === id;
            });
            state.faculties.splice(index, 1)
        },
        facultiesLoaded(state) {
            state.loaded.faculties = true
        },
        //    End Faculty


        //    For Department
        updateDepartments(state, departments) {
            state.departments = departments;
        },
        addToDepartments(state, department) {
            state.departments.push(department);
        },
        updateADepartment(state, department) {
            console.log(department)
            if (!!department) {
                let index = state.departments.findIndex(spec => {
                    return spec.id === department.id;
                });
                Object.assign(state.departments[index], department);
            }

        },
        removeADepartment(state, id) {
            let index = state.departments.findIndex(spec => {
                return spec.id === id;
            });
            state.departments.splice(index, 1)
        },
        departmentsLoaded(state) {
            state.loaded.departments = true
        },
        //    End Department


        //  For Specialization
        updateSpecializations(state, specializations) {
            state.specializations = specializations;
        },
        addToSpecializations(state, specialization) {
            state.specializations.push(specialization);
        },
        updateASpecialization(state, specialization) {
            let index = state.specializations.findIndex(spec => {
                return spec.id === specialization.id;
            });
            Object.assign(state.specializations[index], specialization);
        },
        removeASpecialization(state, id) {
            let index = state.specializations.findIndex(spec => {
                return spec.id === id;
            });
            state.specializations.splice(index, 1)
        },
        specsLoaded(state) {
            state.loaded.specs = true
        },
        //   End Specialization


        //    For Rank
        updateRanks(state, ranks) {
            state.ranks = ranks;
        },
        addToRanks(state, rank) {
            state.ranks.push(rank);
        },
        updateARank(state, rank) {
            if (!!rank) {
                let index = state.ranks.findIndex(spec => {
                    return spec.id === rank.id;
                });
                Object.assign(state.ranks[index], rank);
            }

        },
        removeARank(state, id) {
            let index = state.ranks.findIndex(spec => {
                return spec.id === id;
            });
            state.ranks.splice(index, 1)
        },
        ranksLoaded(state) {
            state.loaded.ranks = true
        },
        //    End Rank


        //    For Staff
        updateStaffs(state, staffs) {
            state.staffs = staffs;
        },
        addToStaffs(state, staff) {
            state.staffs.push(staff);
        },
        updateAStaff(state, rank) {
            if (!!rank) {
                let index = state.staffs.findIndex(spec => {
                    return spec.id === rank.id;
                });
                Object.assign(state.staffs[index], rank);
            }

        },
        removeAStaff(state, id) {
            let index = state.staffs.findIndex(spec => {
                return spec.id === id;
            });
            state.staffs.splice(index, 1)
        },
        staffsLoaded(state) {
            state.loaded.staffs = true
        },
        //    End Staff


    },
    actions: {
        async loadUser(context) {
            await axios.post('/user').then(res => {
                context.commit('updateUser', res.data);
            })
        },
        loadGet(context, url) {
            return new Promise((resolve, reject) => {
                axios.get(url).then(res => {
                    resolve(res)
                }).catch(error => {
                    if (error.response.status === 419) {
                        context.dispatch('pageExpired');
                    }
                    reject(error)
                })
            })
        },
        loadPost(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post(payload.url, payload).then(res => {
                    resolve(res)
                }).catch(error => {
                    if (error.response.status === 419) {
                        context.dispatch('pageExpired');
                    } else {
                        context.dispatch('registerError')
                    }
                    reject(error)
                })
            })
        },

        login: function (context, payload) {
            let info = payload;
            info.url = "/login";
            return new Promise((resolve, reject) => {
                context.dispatch("loadPost", info).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        logout(context) {
            return new Promise((resolve) => {
                context.dispatch('loadPost', {
                    url: '/logout'
                }).then(() => {

                    context.commit('updateUser', {
                        is_admin: false,
                    },);
                })
                resolve()
            })

        },
        pageExpired(context) {
            context.commit('updateIsAuth', false)
            location.reload();
        },

        searchByQuery(context, query) {
            return new Promise((resolve, reject) => {
                let url = `/search/${query}`
                context.dispatch('loadGet', url).then(response => {
                    console.log(response)
                    context.commit('saveQueryResults', response)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })

        },

        loadNext(context) {
            return new Promise(resolve => {
                if (!!context.state.paginator.nextPage) {

                    context.dispatch('loadGet', context.state.paginator.nextPage).then(response => {
                        console.log(response)
                        context.commit('addNextData', response)
                        resolve()
                    })
                }
            })


        },

        loadUserSpecs(context, id) {

            return new Promise(resolve => {
                let info  = {
                    url:'/spec',
                    mode:'get-user-specs',
                    user_id:id,
                }
                context.dispatch('loadPost', info).then((res)=>{
                    resolve(res)
                })
            })
        },


        showError(context) {
            showErrorNotification(context.state.error.message)
        },


        registerError(context, payload = {}) {
            context.state.error.message = payload.errorMessage
            context.state.error.code = payload.errorCode
            context.state.error.param = payload
        },


        //    Load Faculty from db
        loadFaculties(context) {

            if (!context.state.loaded.faculties) {
                let info = {};
                info.url = "/faculty";
                info.mode = "load-faculties";
                return new Promise((resolve, reject) => {
                    context.dispatch("loadPost", info).then(res => {
                        context.commit('updateFaculties', res.data)
                        context.commit("facultiesLoaded")
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })

            }

        },

        //    Create Faculty
        handleFaculty(context, payload) {
            let info = payload;
            info.url = "/faculty";
            return new Promise((resolve, reject) => {
                context.dispatch("loadPost", info).then(res => {
                    if (info.mode === 'create-faculty') {
                        //    Created
                        context.commit('addToFaculties', res.data)
                    } else {
                        //    Updated
                        context.commit('updateAFaculty', res.data)
                    }

                }).catch(error => {
                    reject(error)
                })
            })
        },

        //    Delete Faculty
        deleteFaculty(context, payload) {
            let info = payload;
            info.url = "/faculty";
            info.mode = "delete-faculty";
            return new Promise((resolve, reject) => {
                context.dispatch("loadPost", info).then(() => {
                    context.commit('removeAFaculty', payload.id)
                    resolve()

                }).catch(error => {
                    reject(error)
                })
            })
        },





        loadADepartment(context, id) {

            let info = {};
            info.url = "/department";
            info.mode = "load-department";
            info.id = id;
            return new Promise((resolve, reject) => {
                context.dispatch("loadPost", info).then(res => {
                    context.commit('addToDepartments', res.data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })


        },

        //    Load Department from db
        loadDepartments(context) {

            if (!context.state.loaded.departments) {
                let info = {};
                info.url = "/department";
                info.mode = "load-departments";
                return new Promise((resolve, reject) => {
                    context.dispatch("loadPost", info).then(res => {
                        context.commit('updateDepartments', res.data)
                        context.commit("departmentsLoaded")
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })

            }

        },

        //    Create Department
        handleDepartment(context, payload) {
            let info = payload;
            info.url = "/department";
            return new Promise((resolve, reject) => {
                context.dispatch("loadPost", info).then(res => {
                    if (info.mode === 'create-department') {
                        //    Created
                        context.commit('addToDepartments', res.data)
                    } else {
                        //    Updated
                        context.commit('updateADepartment', res.data)
                    }

                }).catch(error => {
                    reject(error)
                })
            })
        },

        //    Delete Department
        deleteDepartment(context, payload) {
            let info = payload;
            info.url = "/department";
            info.mode = "delete-department";
            return new Promise((resolve, reject) => {
                context.dispatch("loadPost", info).then(() => {
                    context.commit('removeADepartment', payload.id)
                    resolve()

                }).catch(error => {
                    reject(error)
                })
            })
        },




        loadASpecialization(context, id) {

            let info = {};
            info.url = "/spec";
            info.mode = "load-Specialization";
            info.id = id;
            return new Promise((resolve, reject) => {
                context.dispatch("loadPost", info).then(res => {
                    context.commit('addToSpecializations', res.data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })


        },

        //    Load specialization from db
        loadSpecializations(context) {

            if (!context.state.loaded.specs) {
                let info = {};
                info.url = "/spec";
                info.mode = "load-specs";
                return new Promise((resolve, reject) => {
                    context.dispatch("loadPost", info).then(res => {
                        context.commit('updateSpecializations', res.data)
                        context.commit("specsLoaded")
                    }).catch(error => {
                        reject(error)
                    })
                })

            }

        },

        //    Create specialization
        handleSpecialization(context, payload) {
            let info = payload;
            info.url = "/spec";
            return new Promise((resolve, reject) => {
                context.dispatch("loadPost", info).then(res => {
                    if (info.mode === 'create-spec') {
                        //    Created
                        context.commit('addToSpecializations', res.data)
                    } else {
                        //    Updated
                        context.commit('updateASpecialization', res.data)
                    }

                }).catch(error => {
                    reject(error)
                })
            })
        },

        //    Delete Specialization
        deleteSpec(context, payload) {
            let info = payload;
            info.url = "/spec";
            info.mode = "delete-spec";
            return new Promise((resolve, reject) => {
                context.dispatch("loadPost", info).then(() => {
                    context.commit('removeASpecialization', payload.id).then(() => {
                        resolve()
                    })
                }).catch(error => {
                    reject(error)
                })
            })
        },



        loadARank(context, id) {

            let info = {};
            info.url = "/rank";
            info.mode = "load-rank";
            info.id = id;
            return new Promise((resolve, reject) => {
                context.dispatch("loadPost", info).then(res => {
                    context.commit('addToRanks', res.data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })


        },


        //    Load Rank from db
        loadRanks(context) {

            if (!context.state.loaded.ranks) {
                let info = {};
                info.url = "/rank";
                info.mode = "load-ranks";
                return new Promise((resolve, reject) => {
                    context.dispatch("loadPost", info).then(res => {
                        context.commit('updateRanks', res.data)
                        context.commit("ranksLoaded")
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })

            }

        },

        //    Create Rank
        handleRank(context, payload) {
            let info = payload;
            info.url = "/rank";
            return new Promise((resolve, reject) => {
                context.dispatch("loadPost", info).then(res => {
                    if (info.mode === 'create-rank') {
                        //    Created
                        context.commit('addToRanks', res.data)
                    } else {
                        //    Updated
                        context.commit('updateARank', res.data)
                    }

                }).catch(error => {
                    reject(error)
                })
            })
        },

        //    Delete Rank
        deleteRank(context, payload) {
            let info = payload;
            info.url = "/rank";
            info.mode = "delete-rank";
            return new Promise((resolve, reject) => {
                context.dispatch("loadPost", info).then(() => {
                    context.commit('removeARank', payload.id)
                    resolve()

                }).catch(error => {
                    reject(error)
                })
            })
        },


        loadAStaff(context, id) {

            let info = {};
            info.url = "/staffs";
            info.mode = "load-staff";
            info.id = id;
            return new Promise((resolve, reject) => {
                context.dispatch("loadPost", info).then(res => {
                    context.commit('addToStaffs', res.data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })


        },

        //    Load Staffs from db
        loadStaffs(context) {

            if (!context.state.loaded.staffs) {
                console.log("Here")
                let info = {};
                info.url = "/staffs";
                info.mode = "load-staffs";
                return new Promise((resolve, reject) => {
                    context.dispatch("loadPost", info).then(res => {
                        context.commit('updateStaffs', res.data)
                        context.commit("staffsLoaded")
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })

            }

        },

        /*createStaff(context, form){
            return new Promise((resolve, reject)=>{
                let formData = new FormData()
                Object.entries(form).forEach(field => {
                    formData.append(field[0], field[1])
                })
                formData.append('age',3)

                formData.append('image', form.image);
                axios.post('/staffs',formData).then(res => {
                    resolve(res)
                }).catch(error=>{
                    reject(error)
                })
            })
        },*/
        saveImage(context, form) {
            return new Promise((resolve, reject) => {
                if (form === null) {
                    resolve(null)
                }

                axios.post('/staffs', form).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        //    Create Staff
        handleStaff(context, payload) {
            let info = payload;

            return new Promise((resolve, reject) => {

                info.url = "/staffs";


                //Check if the is file
                let formData = null;
                if (payload.image) {
                    formData = new FormData;
                    formData.append('image', payload.image);
                    formData.append('mode', 'get-img');
                }
                context.dispatch('saveImage', formData).then(res => {
                    console.log(!!res, res)
                    if (!!res) {
                        info.img_name = res.data;
                    }
                    context.dispatch('loadPost', info).then(res => {
                        if (info.mode === 'create-staff') {
                            //    Created

                            context.commit('addToStaffs', res.data)
                        } else {
                            //    Updated
                            context.commit('updateAStaff', res.data)
                        }
                    })
                })


                /*context.dispatch("createStaff", info).then(res => {
                    if (info.mode === 'create-staff') {
                        //    Created
                        context.commit('addToStaffs', res.data)
                    } else {
                        //    Updated
                        context.commit('updateAStaff', res.data)
                    }

                }).catch(error => {
                    reject(error)
                })*/


            })
        },

        //    Delete Staff
        deleteStaff(context, payload) {
            let info = payload;
            info.url = "/staffs";
            info.mode = "delete-staff";
            return new Promise((resolve, reject) => {
                context.dispatch("loadPost", info).then(() => {
                    context.commit('removeAStaff', payload.id)
                    resolve()

                }).catch(error => {
                    reject(error)
                })
            })
        },

    },
    getters: {
        isAuth: (state,) => {
            return !!state.user.id;
        },
        getStaffById: (state)=>(id) =>{
            return state.staffs.find(s => {

                return parseInt(s.id) === parseInt(id);
            })
        },
        getDepartmentById: (state)=>(id) =>{
            return state.departments.find(d => {
                return parseInt(d.id) === parseInt(id);
            })
        },
        getRankById: (state)=>(id) =>{
            return state.ranks.find(r => {
                return parseInt(r.id) === parseInt(id);
            })
        },
        getTotalStaffsLoaded(state){
            return state.staffs.length;
        },
        getSpecializationById: (state)=>(id) =>{
            return state.specializations.find(s => {
                return parseInt(s.id) === parseInt(id);
            })
        },


    }
})

export default store;
