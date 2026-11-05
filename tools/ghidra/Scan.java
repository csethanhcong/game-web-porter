import ghidra.app.script.GhidraScript;
import ghidra.program.model.listing.*;
import ghidra.program.model.address.*;
import ghidra.program.model.mem.*;
import java.io.*; import ghidra.program.model.symbol.*;
import java.util.*;
public class Scan extends GhidraScript {
  public void run() throws Exception {
    String[] a=getScriptArgs();
    Memory m=currentProgram.getMemory();
    for(MemoryBlock b:m.getBlocks()) println("blk "+b.getName()+" "+b.getStart()+" "+b.getEnd()+" x="+b.isExecute()+" init="+b.isInitialized());
    MemoryBlock tb=m.getBlock(".text");long s=0, e=0; for(MemoryBlock b:m.getBlocks()) if(b.isExecute()){ s=b.getStart().getOffset(); e=b.getEnd().getOffset(); }
    byte[] buf=new byte[(int)(e-s+1)]; for(int i=0;i<buf.length;i++){try{buf[i]=m.getByte(toAddr(s+i));}catch(Exception ex){buf[i]=0;}}
    TreeSet<Long> cand=new TreeSet<>();
    for(int i=0;i<buf.length-5;i++){
      int b=buf[i]&0xff;
      if(b==0xE8){ int rel=(buf[i+1]&0xff)|((buf[i+2]&0xff)<<8)|((buf[i+3]&0xff)<<16)|((buf[i+4]&0xff)<<24); long t=s+i+5+rel; if(t>=s&&t<=e)cand.add(t);}
      if(b==0x55&&(buf[i+1]&0xff)==0x8B&&(buf[i+2]&0xff)==0xEC) cand.add(s+i);
    }
    println("cands "+cand.size());
    int made=0;
    for(long t:cand){
      Address ad=toAddr(t);
      if(getFunctionAt(ad)!=null) continue;
      if(getFunctionContaining(ad)!=null) continue;
      disassemble(ad);
      if(createFunction(ad,null)!=null) made++;
    }
    println("made "+made);
    PrintWriter pl=new PrintWriter(new FileWriter(a[0]));
    FunctionIterator it=currentProgram.getFunctionManager().getFunctions(true);
    while(it.hasNext()){
      Function f=it.next();
      Set<String> cs=new TreeSet<>(); int nc=0;
      ReferenceIterator ri=currentProgram.getReferenceManager().getReferencesTo(f.getEntryPoint());
      while(ri.hasNext()){ghidra.program.model.symbol.Reference r=ri.next(); nc++; Function c=getFunctionContaining(r.getFromAddress()); if(c!=null)cs.add(c.getEntryPoint().toString());}
      pl.println(f.getEntryPoint()+"\t"+f.getName()+"\t"+f.getBody().getNumAddresses()+"\t"+nc+"\t"+String.join(",",cs));
    }
    pl.close();
  }
}
