const insertionSort = (arr , position , arraySteps , colorSteps) =>
{
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    // Initially we assume that 1st ele of an array is sorted and all the other elements to the right of it is unsorted
    // Traverse on unsorted part of array

    for(let i=1;i<arr.length;i++)
    {
        let j = i-1;
        let numberToInsert = arr[i]
        while(j>=0 && arr[j] > numberToInsert)
        {
            arr[j+1] = arr[j];
            arraySteps.push(arr.slice());

            colorKey[i] = 3;
            if(i === j+1)
            {
                colorKey[j+1] = 3;
            }
            else colorKey[j+1] = 1;
            colorKey[j] = 1;

            colorSteps.push(colorKey.slice()); 

            colorKey[j+1] = 0;
            colorKey[i] = 0;
            colorKey[j] = 0;
            j = j-1;
        }
        arr[j+1] = numberToInsert 
        arraySteps.push(arr.slice());
        colorSteps.push(colorKey.slice());
    }
    colorSteps[colorSteps.length-1] = new Array(arr.length).fill(2);
}

export default insertionSort;

// const arr = [-6,20,8,-2,4]
// insertionSort(arr)
// console.log(arr)