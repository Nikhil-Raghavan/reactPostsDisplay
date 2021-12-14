export const loadState = () => {
    try {
        // const serializedState = localStorage.getItem('state')
        const serializedState = JSON.parse(sessionStorage.getItem("state"));

        // serializedState.home.testimonialsData = [];
        if (serializedState === null) {
            return undefined
        }
        return serializedState
    } catch (e) {
        return undefined
    }
}

export const saveState = (state) => {
    try {
        const allowed = ['router'];
        const filtered = Object.keys(state)
            .filter(key => !allowed.includes(key))
            .reduce((obj, key) => {
                return {
                    ...obj,
                    [key]: state[key]
                };
            }, {});

        // console.log(filtered);
        const serializedState = JSON.stringify(filtered)
        sessionStorage.setItem('state', serializedState)
        let date = new Date();
        localStorage.setItem('date', date)
    } catch (e) {
        console.log('saveState error = ', e)
    }
}