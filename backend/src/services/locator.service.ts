export class ServiceLocator {
  static registeredClasses: any[] = new Array();
  public static register(interfaceName: any, instance: any) {
    this.registeredClasses[interfaceName] = instance;
  }
  public static resolve(interfaceName: any) {
    return this.registeredClasses[interfaceName];
  }
}

export class ServiceLocatorGeneric {
  static registeredClasses: any[] = new Array();
  public static register<T>(t: { new (): T }, instance: any) {
    let interfaceInstance = new t();
    let interfaceName: any = interfaceInstance.constructor.name;
    console.log(`ServiceLocator registering : ${interfaceName}`);
    this.registeredClasses[interfaceName] = instance;
  }
  public static resolve<T>(t: { new (): T }) {
    let interfaceInstance = new t();
    let interfaceName: any = interfaceInstance.constructor.name;
    console.log(`ServiceLocator resolving : ${interfaceName}`);
    return this.registeredClasses[interfaceName];
  }
}
