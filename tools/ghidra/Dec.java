import ghidra.app.script.GhidraScript;
import ghidra.app.decompiler.*;
import ghidra.program.model.listing.*;
import ghidra.program.model.address.*;
import java.io.*;
public class Dec extends GhidraScript {
  public void run() throws Exception {
    String[] a = getScriptArgs();
    String out = a[0];
    PrintWriter pw = new PrintWriter(new FileWriter(out));
    DecompInterface di = new DecompInterface(); di.openProgram(currentProgram);
    for (int i=1;i<a.length;i++){
      String s=a[i]; boolean asm=false;
      if (s.startsWith("asm:")){asm=true;s=s.substring(4);}
      Address ad = toAddr(Long.parseLong(s.replace("0x",""),16));
      Function f = getFunctionContaining(ad);
      if (f==null){ f=createFunction(ad,null);}
      if (f==null){pw.println("// no function at "+s);continue;}
      pw.println("// ===== "+f.getName()+" @ "+f.getEntryPoint());
      if (asm){
        InstructionIterator it=currentProgram.getListing().getInstructions(f.getBody(),true);
        while(it.hasNext()){Instruction in=it.next();pw.println(in.getAddress()+"  "+in);}
      } else {
        DecompileResults r=di.decompileFunction(f,60,monitor);
        pw.println(r.getDecompiledFunction()==null?"// fail":r.getDecompiledFunction().getC());
      }
    }
    pw.close();
  }
}
