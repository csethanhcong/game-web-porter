import ghidra.app.script.GhidraScript;
import ghidra.app.decompiler.*;
import ghidra.program.model.listing.*;
import ghidra.program.model.address.*;
import ghidra.program.model.symbol.*;
import java.io.*;
import java.util.*;
public class All extends GhidraScript {
  public void run() throws Exception {
    String[] a = getScriptArgs();
    PrintWriter pl = new PrintWriter(new FileWriter(a[0]));
    PrintWriter pd = new PrintWriter(new FileWriter(a[1]));
    DecompInterface di = new DecompInterface(); di.openProgram(currentProgram);
    FunctionIterator it = currentProgram.getFunctionManager().getFunctions(true);
    while(it.hasNext()){
      Function f=it.next();
      long sz=f.getBody().getNumAddresses();
      int nc=0; ReferenceIterator ri=currentProgram.getReferenceManager().getReferencesTo(f.getEntryPoint()); 
      Set<String> cs=new TreeSet<>();
      while(ri.hasNext()){Reference r=ri.next(); nc++; Function c=getFunctionContaining(r.getFromAddress()); if(c!=null)cs.add(c.getEntryPoint().toString());}
      pl.println(f.getEntryPoint()+"\t"+f.getName()+"\t"+sz+"\t"+nc+"\t"+String.join(",",cs));
      if(sz>=0){
        DecompileResults r=di.decompileFunction(f,20,monitor);
        pd.println("// ===== "+f.getName()+" @ "+f.getEntryPoint()+" size "+sz);
        pd.println(r.getDecompiledFunction()==null?"// fail":r.getDecompiledFunction().getC());
      }
    }
    pl.close();pd.close();
  }
}
