// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { AlertTriangle, Shield, Eye, Copy, Check } from 'lucide-react';
// import { toast } from 'sonner';

// export default function SeedScreen() {
//   const [warning, setWarning] = useState(true);
//   const [mnemonic, setMnemonic] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

//   const handleContinue = async ({mnemonic} : {mnemonic : string []}) => {
//     if (warning) {
//       setLoading(true);
//       try {
//         const wallet = await generateWallet();
//         setMnemonic(wallet.mnemonic.split(' '));
//         setWarning(false);
//         toast.success('Seed phrase generated successfully!');
//       } catch (error) {
//         toast.error('Failed to generate wallet. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       toast.success('✅ You can now proceed to the next step!');
//       // Navigate further - you can add your navigation logic here
//     }
//   };

//   const copyToClipboard = async (word: string, index: number) => {
//     try {
//       await navigator.clipboard.writeText(word);
//       setCopiedIndex(index);
//       toast.success(`Word ${index + 1} copied!`);
//       setTimeout(() => setCopiedIndex(null), 2000);
//     } catch (error) {
//       toast.error('Failed to copy to clipboard');
//     }
//   };

//   const copyAllPhrase = async () => {
//     try {
//       await navigator.clipboard.writeText(mnemonic.join(' '));
//       toast.success('Complete seed phrase copied to clipboard!');
//     } catch (error) {
//       toast.error('Failed to copy to clipboard');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center gap-3 mb-4">
//             {warning ? (
//               <AlertTriangle className="w-8 h-8 text-amber-500" />
//             ) : (
//               <Shield className="w-8 h-8 text-blue-600" />
//             )}
//             <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               {warning ? 'Important Security Warning' : 'Your Seed Phrase'}
//             </h1>
//           </div>
//           <p className="text-slate-600 text-lg max-w-2xl mx-auto">
//             {warning 
//               ? 'Please read and understand these security instructions before proceeding'
//               : 'Store these words safely - they are the key to your wallet'
//             }
//           </p>
//         </div>

//         <Card className="backdrop-blur-sm bg-white/70 border-white/20 shadow-xl shadow-blue-500/10 mb-8">
//           <CardContent className="p-8">
//             {warning ? (
//               <div className="space-y-6">
//                 <div className="text-center">
//                   <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
//                     <AlertTriangle className="w-4 h-4" />
//                     Critical Security Information
//                   </div>
//                   <h2 className="text-xl font-semibold text-slate-800 mb-4">
//                     Your seed phrase is the master key to your wallet
//                   </h2>
//                   <p className="text-slate-600 leading-relaxed">
//                     This 12-word phrase is the <strong>only way</strong> to recover your wallet. 
//                     If lost, access to your funds cannot be restored. There is no customer support that can help you recover it.
//                   </p>
//                 </div>

//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
//                   <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
//                     <Shield className="w-5 h-5" />
//                     Security Guidelines
//                   </h3>
//                   <div className="space-y-2 text-blue-700">
//                     <div className="flex items-start gap-2">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
//                       <span>Never share your seed phrase with anyone, ever</span>
//                     </div>
//                     <div className="flex items-start gap-2">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
//                       <span>Store it in a secure, offline location</span>
//                     </div>
//                     <div className="flex items-start gap-2">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
//                       <span>Write it down on paper as a physical backup</span>
//                     </div>
//                     <div className="flex items-start gap-2">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
//                       <span>Never store it digitally or take screenshots</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 <div className="text-center">
//                   <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
//                     <Eye className="w-4 h-4" />
//                     Generated Successfully
//                   </div>
//                   <h2 className="text-xl font-semibold text-slate-800 mb-2">
//                     Write down these 12 words in exact order
//                   </h2>
//                   <p className="text-slate-600">
//                     Click on any word to copy it individually, or use the button below to copy all
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border">
//                   {mnemonic.map((word, index) => (
//                     <button
//                       key={index}
//                       onClick={() => copyToClipboard(word, index)}
//                       className="group relative bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg p-4 transition-all duration-200 hover:scale-105 hover:shadow-md"
//                     >
//                       <div className="text-xs text-slate-400 font-medium mb-1">
//                         {index + 1}
//                       </div>
//                       <div className="text-sm font-semibold text-slate-800 group-hover:text-blue-700">
//                         {word}
//                       </div>
//                       <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                         {copiedIndex === index ? (
//                           <Check className="w-3 h-3 text-green-500" />
//                         ) : (
//                           <Copy className="w-3 h-3 text-slate-400" />
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   <Button
//                     onClick={copyAllPhrase}
//                     variant="outline"
//                     className="flex items-center gap-2 border-slate-300 hover:border-blue-400 hover:bg-blue-50"
//                   >
//                     <Copy className="w-4 h-4" />
//                     Copy All Words
//                   </Button>
//                 </div>

//                 <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
//                   <p className="text-amber-800 text-sm font-medium">
//                     ⚠️ Make sure you've securely stored your seed phrase before continuing
//                   </p>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         <div className="text-center">
//           <Button
//             onClick={handleContinue}
//             disabled={loading}
//             size="lg"
//             className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
//           >
//             {loading ? (
//               <div className="flex items-center gap-2">
//                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                 Generating...
//               </div>
//             ) : warning ? (
//               'I Understand, Generate My Seed Phrase'
//             ) : (
//               'Continue Setup'
//             )}
//           </Button>

//           {!warning && (
//             <p className="text-slate-500 text-sm mt-4 italic">
//               Your seed phrase has been generated securely in your browser
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }