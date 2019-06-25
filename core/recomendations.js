class Recomendations{
    
    constructor(message){
        this.message = message
    }

    getTransportationRoute(){
        let trans1 = [1,2,3,4,5]
        let trans2 = [3,4,5,6,7,8]
        let trans3 = [9,10,11,12,15,16]

        let transNRoute = {}        

        transNRoute[0] = trans1
        transNRoute[1] = trans2
        transNRoute[2] = trans3

        let route = [1,2,4,8,10,12,16]    

        for (let i=0;i<route.length;i++){
            for (let j in transNRoute){
                for (let k=0;k<transNRoute[j].length;k++){
                    if (route[i] == transNRoute[j][k]){
                        console.log(route[i])
                    }                    
                }
            }
        }

    }

    searchTransportation() {
        return "This message will print "+this.message
    }

}

module.exports = Recomendations