import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  ActivityIndicator} from "react-native";

import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { styles } from "../../assets/styles/AuthScreen.styles";
import { Colors } from "../../constants/Colors";
import { SvgXml } from 'react-native-svg';
import {Ionicons} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type Mode = "login" | "register";

export default function AuthScreen() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const router = useRouter();

  const handleSubmit = async ()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
      setVerifying(true)
    },1500)
  }

  const handleVerify = async ()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
      router.replace("/(tabs)")
    },1500)
  }


const svgMrkup = `<svg viewBox="0 0 680 250" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(50, 20)">
    <circle cx="100" cy="110" r="95" fill="#1a1f3c"/>
    <rect x="36" y="54" width="128" height="100" rx="22" fill="#ffffff"/>
    <polygon points="58,148 42,178 86,148" fill="#ffffff"/>
    <circle cx="72" cy="104" r="8" fill="#6c63ff"/>
    <circle cx="100" cy="104" r="8" fill="#6c63ff" opacity="0.6"/>
    <circle cx="128" cy="104" r="8" fill="#6c63ff" opacity="0.3"/>
    <text x="220" y="148">
      <tspan font-family="System" font-size="100" font-weight="1000" fill="#1a1f3c">Chat</tspan><tspan font-family="bold" font-size="100" font-weight="800" fill="#6c63ff">Me</tspan>
    </text>
  </g>
</svg>`;


if(verifying){
  return(
     <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoRow}>
            <SvgXml xml={svgMrkup} width={300} height={120} />
          </View>

          {/*hero text */}
          <Text style={styles.heading}>{mode === "login" ? "Welcome Back! 👋🏼":"Create Account"}</Text>
          <Text style={styles.subheading}>We have sent a 6-digit verification code to {email}.</Text>

          {/*form */}
          <View style={styles.form}>
            
               <View style={styles.field}>
                 <Text style={styles.fieldLabel}>Verification Code</Text>
                
                  <TextInput
                  style={styles.input}
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  placeholder="Enter 6-digit code"
                  placeholderTextColor={Colors.outlineVariant}
                  keyboardType="number-pad"
                  autoCapitalize='none'
                  />
                </View>

                <View style={styles.toggleRow}>
                  <Text style={styles.toggleText}>Did not recieve a code?</Text>
                  <TouchableOpacity onPress={()=> setVerifying(false)}>
                    <Text style={styles.toggleText}>Go Back</Text>
                  </TouchableOpacity>
                </View>

                

                {/*submit */}
                <TouchableOpacity onPress={handleVerify} disabled={loading} activeOpacity={0.88}
                style={styles.btnWrapper}>
                  <LinearGradient colors={[Colors.primary,Colors.primaryContainer]}
                    start={{x:0 , y:0}}
                    end={{x:1 , y:1}}
                    style={styles.btn}
                    >
                    
                    {loading ? (
                      <ActivityIndicator color={Colors.onPrimary} 
                      size="small"/>
                      ) :(
                        <>
                         <Text style={styles.btnText}>
                          Verify Code
                         </Text>
                         <Ionicons name='arrow-forward' size={18} color={Colors.onPrimary} />
                        </>
                      )}
                  </LinearGradient>

                </TouchableOpacity>

            

          </View>


        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoRow}>
            <SvgXml xml={svgMrkup} width={300} height={120} />
          </View>

          {/*hero text */}
          <Text style={styles.heading}>{mode === "login" ? "Welcome Back! 👋🏼":"Create Account"}</Text>
          <Text style={styles.subheading}>{mode === "login" ? "Sign in to coninue chatting":"Fill in your details to get started."}</Text>

          {/*form */}
          <View style={styles.form}>
            {mode === "register" && (
              <>
              <View style={styles.field}>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Your Name"
                  placeholderTextColor={Colors.outlineVariant}
                  autoCapitalize='words'/>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Username Handle</Text>
                <View style={styles.handleRow}>
                  <Text style={styles.atSign}>@</Text>
                  <TextInput
                  style={[styles.input,styles.handleInput]}
                  value={handle}
                  onChangeText={(v)=>setHandle(v.toLowerCase().replace(/\s/g,""))}
                  placeholder="username"
                  placeholderTextColor={Colors.outlineVariant}
                  autoCapitalize="none"
                  />

                </View>
              </View>

              </>
            )}

               <View style={styles.field}>
                 <Text style={styles.fieldLabel}>Email</Text>
                
                  <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@gmail.com"
                  placeholderTextColor={Colors.outlineVariant}
                  keyboardType="email-address"
                  autoCapitalize='none'
                  />
                </View>

                <View style={styles.field}>
                 <Text style={styles.fieldLabel}>Password</Text>
                
                  <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder='********'
                  placeholderTextColor={Colors.outlineVariant}
                  secureTextEntry
                  />

                </View>

                {/*Toggle mode */}
                <View style={styles.toggleRow}>
                  <Text style={styles.toggleText}>
                    {mode === "login" ? "Don't have an account?" :
                    "Already have an account?"}
                  </Text>
                  <TouchableOpacity onPress={()=>setMode(mode === "login" ? "register": "login")}>
                    <Text style={styles.toggleLink}>
                      {mode === 'login' ? "Sign Up": "Sign In" }
                    </Text>
                  </TouchableOpacity>
                </View>

                {/*submit */}
                <TouchableOpacity onPress={handleSubmit} disabled={loading} activeOpacity={0.88}
                style={styles.btnWrapper}>
                  <LinearGradient colors={[Colors.primary,Colors.primaryContainer]}
                    start={{x:0 , y:0}}
                    end={{x:1 , y:1}}
                    style={styles.btn}
                    >
                    
                    {loading ? (
                      <ActivityIndicator color={Colors.onPrimary} 
                      size="small"/>
                      ) :(
                        <>
                         <Text style={styles.btnText}>
                          {mode === 'login' ? "Sign In": "Create Account"}
                         </Text>
                         <Ionicons name='arrow-forward' size={18} color={Colors.onPrimary} />
                        </>
                      )}
                  </LinearGradient>

                </TouchableOpacity>

            

          </View>


        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}