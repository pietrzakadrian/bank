import { ServiceLocatorGeneric } from "../../services/locator.service";
import "reflect-metadata";

export function ConstructorInject(classDefinition: Function) {
  console.log(`classDefinition:`);
  console.log(`================`);
  console.log(`${classDefinition}`);
  console.log(`================`);

  let firstIdx = classDefinition.toString().indexOf("(") + 1;
  let lastIdx = classDefinition.toString().indexOf(")");
  let arr = classDefinition.toString().substr(firstIdx, lastIdx - firstIdx);

  console.log(`class parameters :`);
  console.log(`${arr}`);
  console.log(`==================`);

  let splitArr = arr.split(", ");

  for (let paramName of splitArr) {
    console.log(`found parameter named : ${paramName}`);
  }

  let parameterTypeArray = Reflect.getMetadata(
    "design:paramtypes",
    classDefinition
  );
  console.log(`parameterTypeArray:`);
  console.log(`===================`);
  console.log(`${parameterTypeArray}`);
  console.log(`===================`);

  for (let type of parameterTypeArray) {
    console.log(`found type : ${type.name}`);
  }

  for (let i = 0; i < splitArr.length; i++) {
    let propertyName = splitArr[i];
    let typeName = parameterTypeArray[i];

    console.log(`
        parameterName : ${propertyName} 
        is of type    : ${typeName.name}`);

    Object.defineProperty(classDefinition.prototype, propertyName, {
      get: function() {
        return ServiceLocatorGeneric.resolve(eval(typeName));
      }
    });
  }
}
