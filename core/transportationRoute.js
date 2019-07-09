class TransportationRoute{
    constructor(tRoute){
        this.tRoute = tRoute
    }

    getTRoute(){
        let trans1 = [1220349,1220311,1220355]
        let trans2 = [1220311,1220312,1220350,1220313,1220314,1220351]        

        let transNRoute = {}        

        transNRoute['05. Cicaheum - Ledeng'] = trans1
        transNRoute['Gegerkalong Hilir - Polban'] = trans2        

        return transNRoute
    }

}

module.exports = TransportationRoute