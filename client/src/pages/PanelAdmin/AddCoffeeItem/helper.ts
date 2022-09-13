export const inputHelper = [
  { name: 'name', id: '1', placeHolder: 'Name', textArea: false },
  { name: 'country', id: '2', placeHolder: 'Country', textArea: false  },
  { name: 'growthHeight', id: '3', placeHolder: 'Growing height', textArea: false  },
  { name: 'screen', id: '4', placeHolder: 'Screen', textArea: false  },
  { name: 'description', id: '5', placeHolder: 'Description', textArea: true  }
  
]
export const fermentationSelect = [
  { label: 'Washed', value: 'Washed' },
  { label: 'Unwashed', value: 'Unwashed' },
  { label: 'Hani', value: 'Hani' }
]
export const degreeRoastSelect = [
  { label: 'Светлая', value: 'soft' },
  { label: 'Средняя', value: 'medium' },
  { label: 'Темная', value: 'hard' }
]
export const rangeInput = [
  { id: '1',name: 'acidity', label: 'Acidity', min: '1', max: '10' },
  { id: '2',name: 'density', label: 'Density', min: '1', max: '10' },
  { id: '3',name: 'grade', label: 'Grade', min: '50', max: '100' },
  { id: '4',name: 'minPrice', label: 'Min Price', min: '100', max: '10000' },
  { id: '5',name: 'maxPrice', label: 'Max Price', min: '100', max: '10000' }
]

export const inputErrorMessage = (data:any, setErrors:any) => {

  for(const fieldName in data) {
    if(fieldName === 'name') {
      if(!data[fieldName]) {
        setErrors({ field: fieldName, message: "Name is required" })
        return
      } 
      if (data[fieldName].length > 30) {
        setErrors({ field: fieldName, message: "Max length 40 symbols" })
        // setErrors("Max length 40 symbols")
        return
      }
      if (data[fieldName].length < 5) {
        setErrors({ field: fieldName, message: "Min length 5 symbols" })
        // setErrors("Min length 5 symbols")
        return
      }

      setErrors({ field: '', message: '' })
    }
    if(fieldName === 'country') {
      if(!data[fieldName]) {
        setErrors({ field: fieldName, message: "Country is required" })
        // setErrors("Country is required")
        return
      }
      if (data[fieldName].length < 5) {
        setErrors({ field: fieldName, message: "Min length 5 symbols" })
        // setErrors("Min length 5 symbols")
        return
      }
      setErrors({ field: '', message: '' })
      // setErrors("")
    }
    if(fieldName === 'growthHeight') {
      if(!data[fieldName]) {
        setErrors({ field: fieldName, message: "Growth Height is required" })
        // setErrors("Growth Height is required")
        return
      }
      if(!data[fieldName].match(/\d{3,4}\b\-\d{4}\b/g)) {
        setErrors({ field: fieldName, message: "Growth Height format xxxx-xxxx eller xxxx-xxxx" })
        // setErrors("Growth Height format xxxx-xxxx eller xxxx-xxxx")
        return
      }
      setErrors({ field: '', message: '' })
    }
    if(fieldName === 'screen') {
      if(!data[fieldName]) {
        setErrors({ field: fieldName, message: "Screen is required" })
        // setErrors("Screen is required")
        return
      } 
      if (!data[fieldName].match(/\d{1,2}\b\/\d{2}\b/g)) {
        setErrors({ field: fieldName, message: "Screen format xx/xx eller x/xx" })
        // setErrors("Screen format xx/xx eller x/xx")
        return
      }
      
      setErrors({ field: '', message: '' })
    }
    if(fieldName === 'description') {
      if(!data[fieldName]) {
        setErrors({ field: fieldName, message: "Description is required" })
        // setErrors("Description is required")
        return
      }if (data[fieldName].length < 10) {
        setErrors({ field: fieldName, message:"Min length 10 symbols" })
        // setErrors("Min length 10 symbols")
        return
      }
      if (data[fieldName].length > 60) {
        setErrors({ field: fieldName, message:"Max length 60 symbols" })
        // setErrors("Max length 60 symbols")
        return
      }
      setErrors({ field: '', message: '' })
    }
  }
};

export const selectErrorMessage = (data: any, setErrors: any) => {
  for(const fieldName in data) {
    if(fieldName === 'fermentation') {
      if(!data[fieldName]) {
        setErrors(`Fermentation is required`)
        return
      }
      setErrors('')
    }
    if(fieldName === 'degreeRoast') {
      if(!data[fieldName]) {
        setErrors(`Degree roast is required`)
        return
      }
      setErrors('')
    }
   
  }
}