class Service {
    async makeRequests(url){
        return (await fetch(url)).json()
    }

    async getPlanets(url){

        const data = await this.makeRequests(url)

        return {
            name: data.name, 
            surfaceWater: data.surface_water, 
            appearedIn: data.films.length
        }

    }

}

module.exports = Service