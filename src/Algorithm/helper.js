export function swap(arr , i ,j)
{
    let c = arr[i];
    arr[i] = arr[j];
    arr[j] = c;
    return arr;
}

export function insertStep(arrayNew, position, arraySteps) {
	let currentStep = arraySteps[arraySteps.length - 1].slice();
	currentStep.splice(position, arrayNew.length, ...arrayNew);
	arraySteps.push(currentStep);
}