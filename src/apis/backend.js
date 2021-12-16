const jobPrefix = "/api/job/"
const userPrefix = "/api/users/"

export const userAPIs = {
    getCurrentUserUnsafe: userPrefix + "whoIsLoggedInButWithoutMiddleware", 
    getCurrentUser: userPrefix + "whoIsLoggedIn",
    login: userPrefix + "login",
    signup: userPrefix + "signup",
    logout: userPrefix + "logout",
} 

export const jobAPIs = {
    findJobByTitle: jobPrefix + "findJobByTitle/", 
    findJobById: jobPrefix + "findJobById/", 
    findAllJobs: jobPrefix + "findAllJobs",
    findAllMyFavorites: jobPrefix + "myFavorites",
    createJob: jobPrefix + "create",
    editJob: jobPrefix + "edit/",
    deleteJob: jobPrefix + "delete/",
    favoriteAJob: jobPrefix + "favoriteJob/",
    unfavoriteAJob: jobPrefix + "unfavoriteJob/",
    checkIsFavorite: jobPrefix + "isMyFavorite/",
}