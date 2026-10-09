type R3FProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      group: R3FProps;
      mesh: R3FProps;
      ambientLight: R3FProps;
      directionalLight: R3FProps;
      torusKnotGeometry: R3FProps;
      torusGeometry: R3FProps;
      sphereGeometry: R3FProps;
      meshStandardMaterial: R3FProps;
      meshBasicMaterial: R3FProps;
    }
  }
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      group: R3FProps;
      mesh: R3FProps;
      ambientLight: R3FProps;
      directionalLight: R3FProps;
      torusKnotGeometry: R3FProps;
      torusGeometry: R3FProps;
      sphereGeometry: R3FProps;
      meshStandardMaterial: R3FProps;
      meshBasicMaterial: R3FProps;
    }
  }
}

export {};
