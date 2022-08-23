import {swap} from './helper';

const selection = (arr , position , arraySteps , colorSteps) =>
{
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    
    for(let i=0;i<arr.length-1 ; i++)
    {
        let min_index = i;
        for(let j=i+1;j<arr.length;j++)
        {
            if(arr[j] < arr[min_index])
            {
                min_index=j;
            }
            colorKey[min_index] = 1;
            colorKey[j] = 1;

            arraySteps.push(arr.slice());
            colorSteps.push(colorKey.slice());

            colorKey[min_index] = 0;
            colorKey[j] = 0;
        }
        swap(arr , min_index ,i);
        colorKey[i] = 2;
        arraySteps.push(arr.slice());
        colorSteps.push(colorKey.slice());
    }

    colorSteps[colorSteps.length - 1] = new Array(arr.length).fill(2);
}

export default selection;