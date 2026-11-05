import ghidra.app.script.GhidraScript;
import ghidra.program.model.address.*;
import ghidra.program.model.symbol.*;
import ghidra.program.model.listing.*;
import ghidra.program.model.mem.*;
import java.io.*;
public class Xr extends GhidraScript { public void run() throws Exception {
 String[] a=getScriptArgs(); PrintWriter pw=new PrintWriter(new FileWriter(a[0]));
 for(int i=1;i<a.length;i++){
  String s=a[i];
  if(s.startsWith("f:")){ // float/dword dump: f:addr
   Address ad=toAddr(Long.parseLong(s.substring(2).replace("0x",""),16));
   int d=currentProgram.getMemory().getInt(ad);
   long q=currentProgram.getMemory().getLong(ad);
   pw.println(ad+" dword=0x"+Integer.toHexString(d)+" float="+Float.intBitsToFloat(d)+" double="+Double.longBitsToDouble(q)+" int="+d);
   continue;}
  Address ad=toAddr(Long.parseLong(s.replace("0x",""),16));
  pw.println("== xrefs to "+ad);
  for(Reference r: getReferencesTo(ad)){ Function f=getFunctionContaining(r.getFromAddress());
   Instruction in=getInstructionAt(r.getFromAddress());
   pw.println(r.getFromAddress()+" "+r.getReferenceType()+" in "+(f==null?"?":f.getName())+"   "+in);}
 }
 pw.close();}}
