class Calc {
    
    MinSellPrice(g: number): number {
      const b = 0.24;
      const v = 50;
      const vb = v * b;
  
      const result = (g + vb) / v;
  
      return result;
    }
  
    // Buy Price, Volume,  Fee, Gain
    MinSellPrice_WithFee(b:number, v: number, f:number, g: number): number{
        const bv = b * v;
        const bvf = b * v * f;
  
        const top = g + bv + bvf;
        const bottom = v * (1 - f);
  
        return top / bottom;
    }
  }
  
  export default Calc;