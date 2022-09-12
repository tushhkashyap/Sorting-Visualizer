import {swap} from './helper';


const bubbleSort = (arr , position , arraySteps , colorSteps) =>
{
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    for(let j=0;j<arr.length-1;j++)
    { 
        for(let i=0;i<arr.length-j-1;i++)
        {
            if(arr[i] > arr[i+1])
            {  
                arr = swap(arr , i ,i+1);
            } 
            arraySteps.push(arr.slice());
            colorKey[i]=1; //currently this item is reviewing
            colorKey[i+1]=1;

            colorSteps.push(colorKey.slice());

            // Now we are done reviewing that element 
            // so change it's key
            colorKey[i]=0; 
            colorKey[i+1]=0;
        }
        
        // finally after sorting...set the color to 2
        // once inner for-loop finish it's mean last element is sorted
        colorKey[arraySteps.length -1-j] = 2;
        arraySteps.push(arr.slice());
        colorSteps.push(colorKey.slice());
 
    }

    // once sorting is cmplt then set the color of all the bars to 2
    colorSteps[colorSteps.length-1] = new Array(arr.length).fill(2);
    return;
};
 
export default bubbleSort; 