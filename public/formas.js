const formas = (() => {
    const cubo = () => {
      return new THREE.BoxGeometry();
    };
  
    const capsula = () => {
      return new THREE.CapsuleGeometry(1, 2, 4, 8);
    };
  
    const cone = () => {
      return new THREE.ConeGeometry(1, 2, 12);
    };
  
    const cilindro = () => {
      return new THREE.CylinderGeometry(1, 1, 2, 32);
    };
  
    const esfera = () => {
      return new THREE.SphereGeometry(1, 32, 32);
    };
  
    const tetraedro = () => {
        return new THREE.TetrahedronGeometry(1);
      };
    
      const dodecaedro = () => {
        return new THREE.DodecahedronGeometry(1);
      };
    
      const icosaedro = () => {
        return new THREE.IcosahedronGeometry(1);
      };
      const octaedro = () => {
        return new THREE.OctahedronGeometry(1);
      };
      const prisma = () => {
        return new THREE.BoxGeometry(1, 2, 3);
      };
      const piramide = () => {
        return new THREE.ConeGeometry(1, 1, 4);
      };

      const coneMeiaFenda = () => {
        const geometry = new THREE.ConeGeometry(1, 2, 12);
        geometry.scale(1, 1, 0.5); // Escala a metade na direção do eixo Z
        return geometry;
      };
      
      const coneDeTronco = () => {
        return new THREE.CylinderGeometry(1, 0.5, 2, 12); // Cone de tronco com topo menor
      };
      
      const coneDeDuplaBase = () => {
        return new THREE.CylinderGeometry(1, 1, 2, 12); // CylinderGeometry é usado para cones de dupla base
      };
      
      const piramideTriangular = () => {
        return new THREE.ConeGeometry(1, 2, 3);
      };
      
      const piramidePentagonal = () => {
        const geometry = new THREE.ConeGeometry(1, 2, 5); // Use 5 segmentos para uma base pentagonal
        return geometry;
      };
      
      const piramideHexagonal = () => {
        const geometry = new THREE.ConeGeometry(1, 2, 6); // Use 6 segmentos para uma base hexagonal
        return geometry;
      };
      
      const prismaQuadrado = () => {
        return new THREE.BoxGeometry(2, 2, 2); // Um prisma quadrado com todos os lados de 2 unidades
      };

      const paralelepipedo = () => {
        return new THREE.BoxGeometry(3, 2, 1);
      }; 
        
      
      
      
      


      return {
        cubo,
        esfera,
        capsula,
        cone,
        cilindro,
        tetraedro,
        dodecaedro,
        icosaedro,
        octaedro,
        prisma,
        piramide,
        coneMeiaFenda,
        coneDeTronco,
        coneDeDuplaBase,
        piramideTriangular,
        piramidePentagonal,
        piramideHexagonal,
        prismaQuadrado,
        paralelepipedo
        
    
      };
    })();      