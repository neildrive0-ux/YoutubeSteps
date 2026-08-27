import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { useColors } from '@/hooks/useColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const services = [
  { icon: 'home' as const, title: 'Residential', copy: 'Driveways, walkways, and steps cleared before the day begins.' },
  { icon: 'briefcase' as const, title: 'Commercial', copy: 'Lots and entrances kept open, accessible, and ready.' },
  { icon: 'truck' as const, title: 'Snow hauling', copy: 'High banks loaded out and hauled away when space matters.' },
  { icon: 'shield' as const, title: 'Ice management', copy: 'Proactive salting and de-icing to reduce winter risk.' },
];

const reasons = [
  'Fully insured & registered in Alberta',
  'Reliable & on-time service',
  'Seasonal contracts with no hassle',
  'Professional equipment',
  'Local & trusted in Grande Prairie',
];

const contractSections = [
  ['Snow Removal Service Agreement', 'Ai Landscaping & SnowRemoval'],
  ['1. Parties', 'Service Provider: Ai Landscaping & SnowRemoval\n\nClient:\nName: ____________________________\nAddress: __________________________\nPhone: ____________________________\nEmail: ____________________________'],
  ['2. Term', 'Service begins __________________, 2026 for the selected term:\n\n[ ] 4 Months    [ ] 5 Months    [ ] 12 Months'],
  ['3. Services', 'Snow removal includes plowing of driveways, parking areas, and designated zones.\n\nTrigger: ~1.5 cm snowfall or as required.\n\nTiming: Within reasonable timeframe.'],
  ['4. Client Responsibilities', 'Provide access\n\nRemove obstacles\n\nMark hazards'],
  ['5. Payment', 'Total: $________ + tax\n\n[ ] Paid in full\n\n[ ] Monthly: $________ due ___'],
  ['5A. Late Payments', '2% per month (24% annually). Client pays collection costs.'],
  ['6. No Refunds', 'All payments non-refundable.'],
  ['7. Insurance', 'Fully insured in Alberta.'],
  ['8. Liability', 'Not responsible for hidden hazards.'],
  ['9. Indemnity', 'Client holds Contractor harmless unless negligence.'],
  ['10. Conditions', 'Delays may occur due to weather or breakdowns.'],
  ['11. Termination', 'All remaining amounts due immediately upon termination.'],
  ['12. General', 'Governed by Alberta law.'],
  ['13. Signatures', 'Contractor:\n\nSignature: _______________________\nName: ___________________________\nDate: ___________________________\n\nClient:\n\nSignature: _______________________\nName: ___________________________\nPhone: __________________________\nEmail: ___________________________\nDate: ___________________________'],
];

type FormValues = {
  name: string;
  phone: string;
  email: string;
  address: string;
};

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [contractOpen, setContractOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormValues>({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const topInset = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;
  const bottomInset = Platform.OS === 'web' ? Math.max(insets.bottom, 34) : insets.bottom;
  const onlineContractUrl = process.env.EXPO_PUBLIC_DOMAIN
    ? `https://${process.env.EXPO_PUBLIC_DOMAIN}/snow-removal-service-agreement.pdf`
    : null;

  const updateField = (key: keyof FormValues) => (value: string) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submitQuote = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.address.trim()) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Add your details', 'Please complete every field so we can follow up about your property.');
      return;
    }
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setSubmitted(true);
  };

  const callCompany = () => {
    void Linking.openURL('tel:+17809957459');
  };

  const emailCompany = () => {
    void Linking.openURL('mailto:ailandscapinggp@gmail.com');
  };

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollViewCompat
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: topInset + 18, paddingBottom: bottomInset + 28 }]}
        bottomOffset={72}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topLine}>
          <Image source={require('../assets/images/icon.png')} style={styles.logo} accessibilityLabel="Ai SnowRemoval logo" />
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Serving Grande Prairie</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Winter readiness, handled</Text>
          <Text style={styles.heroTitle}>Reliable snow removal you can count on all winter.</Text>
          <Text style={styles.heroCopy}>Professional, insured service for Grande Prairie and surrounding areas.</Text>
          <View style={styles.heroActions}>
            <Pressable
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
              onPress={() => Alert.alert('Get a quote', 'Scroll to the quote form below and send us your property details.')}
              testID="button-mobile-quote"
            >
              <Text style={styles.primaryButtonText}>Get a quote</Text>
              <Feather name="arrow-up-right" size={17} color={colors.primaryForeground} />
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
              onPress={() => setContractOpen(true)}
              testID="button-mobile-contract"
            >
              <Text style={styles.secondaryButtonText}>View contract</Text>
              <Feather name="file-text" size={16} color={colors.foreground} />
            </Pressable>
          </View>
        </View>

        <View style={styles.trustRow}>
          <Feather name="shield" size={17} color={colors.accent} />
          <Text style={styles.trustText}>Seasonal plans. Clear terms. One less thing to think about.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionKicker}>What we clear</Text>
          <Text style={styles.sectionTitle}>Ready for winter, from the first flurry to the last thaw.</Text>
          <View style={styles.serviceGrid}>
            {services.map((service) => (
              <View key={service.title} style={styles.serviceCard}>
                <View style={styles.iconBox}>
                  <Feather name={service.icon} size={19} color={colors.accentForeground} />
                </View>
                <Text style={styles.cardTitle}>{service.title}</Text>
                <Text style={styles.cardCopy}>{service.copy}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.planCard}>
          <View style={styles.planTopLine}>
            <Text style={styles.sectionKicker}>Stay covered</Text>
            <Text style={styles.planNumber}>01</Text>
          </View>
          <Text style={styles.planTitle}>4 or 5 month seasonal contracts.</Text>
          <Text style={styles.planCopy}>Choose the length that works for your property. We handle the snow all season.</Text>
          <View style={styles.planFacts}>
            <View style={styles.factRow}><Feather name="check" size={15} color={colors.accent} /><Text style={styles.factText}>Pay upfront or monthly</Text></View>
            <View style={styles.factRow}><Feather name="check" size={15} color={colors.accent} /><Text style={styles.factText}>No hidden fees</Text></View>
            <View style={styles.factRow}><Feather name="check" size={15} color={colors.accent} /><Text style={styles.factText}>Residential &amp; commercial</Text></View>
          </View>
          <Pressable
            style={({ pressed }) => [styles.planButton, pressed && styles.pressed]}
            onPress={() => setContractOpen(true)}
            testID="button-plan-contract"
          >
            <Text style={styles.planButtonText}>Read the agreement</Text>
            <Feather name="arrow-right" size={17} color={colors.accentForeground} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionKicker}>Why Ai</Text>
          <Text style={styles.sectionTitle}>Prepared is better than surprised.</Text>
          <View style={styles.reasonList}>
            {reasons.map((reason, index) => (
              <View key={reason} style={styles.reasonRow}>
                <Text style={styles.reasonNumber}>{String(index + 1).padStart(2, '0')}</Text>
                <Text style={styles.reasonText}>{reason}</Text>
                <Feather name="check" size={17} color={colors.accent} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.quoteSection}>
          <Text style={styles.sectionKicker}>Get your spot</Text>
          <Text style={styles.sectionTitle}>Before winter fills up.</Text>
          <Text style={styles.quoteIntro}>Send your property details and we’ll follow up with availability and next steps.</Text>
          <View style={styles.contactActions}>
            <Pressable style={({ pressed }) => [styles.contactAction, pressed && styles.pressed]} onPress={callCompany} testID="button-call-company">
              <Feather name="phone" size={16} color={colors.accentForeground} />
              <Text style={styles.contactActionText}>780-995-7459</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.contactAction, pressed && styles.pressed]} onPress={emailCompany} testID="button-email-company">
              <Feather name="mail" size={16} color={colors.accentForeground} />
              <Text style={styles.contactActionText}>Email us</Text>
            </Pressable>
          </View>
          <View style={styles.formCard}>
            <TextInput style={styles.input} value={form.name} onChangeText={updateField('name')} placeholder="Name" placeholderTextColor={colors.mutedForeground} testID="input-mobile-name" />
            <TextInput style={styles.input} value={form.phone} onChangeText={updateField('phone')} placeholder="Phone" placeholderTextColor={colors.mutedForeground} keyboardType="phone-pad" testID="input-mobile-phone" />
            <TextInput style={styles.input} value={form.email} onChangeText={updateField('email')} placeholder="Email" placeholderTextColor={colors.mutedForeground} keyboardType="email-address" autoCapitalize="none" testID="input-mobile-email" />
            <TextInput style={styles.input} value={form.address} onChangeText={updateField('address')} placeholder="Property address" placeholderTextColor={colors.mutedForeground} testID="input-mobile-address" />
            <Pressable style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]} onPress={submitQuote} testID="button-mobile-submit-quote">
              <Text style={styles.submitButtonText}>Get Your Spot Before Winter Fills Up</Text>
              <Ionicons name="arrow-forward" size={18} color={colors.primaryForeground} />
            </Pressable>
            {submitted && (
              <View style={styles.successRow} accessibilityRole="text" testID="status-mobile-quote-success">
                <Feather name="check-circle" size={17} color={colors.success} />
                <Text style={styles.successText}>Thanks — your request is ready for our team.</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <Image source={require('../assets/images/icon.png')} style={styles.footerLogo} accessibilityLabel="Ai SnowRemoval logo" />
          <Text style={styles.footerText}>Ai Landscaping &amp; SnowRemoval</Text>
          <Text style={styles.footerSubtext}>Grande Prairie &amp; surrounding areas</Text>
          <Text style={styles.footerSubtext}>780-995-7459  •  ailandscapinggp@gmail.com</Text>
          <Text style={styles.copyright}>Copyright 2026 Ai Landscaping &amp; SnowRemoval</Text>
        </View>
      </KeyboardAwareScrollViewCompat>

      <Modal visible={contractOpen} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setContractOpen(false)}>
        <View style={[styles.modalScreen, { paddingTop: topInset, paddingBottom: bottomInset }]}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.sectionKicker}>Your winter plan</Text>
              <Text style={styles.modalTitle}>Service agreement</Text>
            </View>
            <Pressable style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]} onPress={() => setContractOpen(false)} accessibilityLabel="Close contract" testID="button-close-mobile-contract">
              <Feather name="x" size={21} color={colors.foreground} />
            </Pressable>
          </View>
          <KeyboardAwareScrollViewCompat contentContainerStyle={styles.contractContent} showsVerticalScrollIndicator={false}>
            {contractSections.map(([heading, body]) => (
              <View key={heading} style={styles.contractBlock}>
                <Text style={heading === 'Snow Removal Service Agreement' ? styles.contractMainHeading : styles.contractHeading}>{heading}</Text>
                <Text style={styles.contractBody}>{body}</Text>
              </View>
            ))}
            <Pressable
              style={({ pressed }) => [styles.onlineContractButton, pressed && styles.pressed]}
              onPress={() => {
                if (onlineContractUrl) {
                  void Linking.openURL(onlineContractUrl);
                } else {
                  Alert.alert('Contract included', 'The complete agreement is available to read in this app.');
                }
              }}
              testID="button-open-online-contract"
            >
              <Text style={styles.onlineContractText}>{onlineContractUrl ? 'Open PDF contract' : 'Contract included in app'}</Text>
              <Feather name="external-link" size={16} color={colors.accentForeground} />
            </Pressable>
            <Pressable style={({ pressed }) => [styles.modalQuoteButton, pressed && styles.pressed]} onPress={() => { setContractOpen(false); setTimeout(() => Alert.alert('Get a quote', 'Scroll to the quote form and send us your details.'), 250); }} testID="button-mobile-contract-quote">
              <Text style={styles.modalQuoteButtonText}>Continue to quote request</Text>
              <Feather name="arrow-right" size={17} color={colors.primaryForeground} />
            </Pressable>
          </KeyboardAwareScrollViewCompat>
        </View>
      </Modal>
    </View>
  );
}

type Palette = ReturnType<typeof useColors>;

function createStyles(colors: Palette) {
  return StyleSheet.create({
    screen: { backgroundColor: colors.background, flex: 1 },
    scroll: { flex: 1 },
    content: { paddingHorizontal: 20 },
    topLine: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 34 },
    logo: { height: 48, resizeMode: 'contain', width: 112 },
    statusPill: { alignItems: 'center', backgroundColor: colors.secondary, borderRadius: 999, flexDirection: 'row', gap: 7, paddingHorizontal: 10, paddingVertical: 8 },
    statusDot: { backgroundColor: colors.accent, borderRadius: 99, height: 7, width: 7 },
    statusText: { color: colors.secondaryForeground, fontFamily: 'Inter_600SemiBold', fontSize: 10 },
    hero: { marginBottom: 18 },
    eyebrow: { color: colors.accentForeground, fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.8, marginBottom: 16, textTransform: 'uppercase' },
    heroTitle: { color: colors.foreground, fontFamily: 'Inter_700Bold', fontSize: 43, letterSpacing: -1.8, lineHeight: 47, marginBottom: 18 },
    heroCopy: { color: colors.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 16, lineHeight: 24, maxWidth: 330 },
    heroActions: { flexDirection: 'row', gap: 10, marginTop: 26 },
    primaryButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: colors.radius, flex: 1, flexDirection: 'row', gap: 8, justifyContent: 'center', minHeight: 52, paddingHorizontal: 13 },
    primaryButtonText: { color: colors.primaryForeground, fontFamily: 'Inter_700Bold', fontSize: 13 },
    secondaryButton: { alignItems: 'center', borderColor: colors.border, borderRadius: colors.radius, borderWidth: 1, flex: 1, flexDirection: 'row', gap: 8, justifyContent: 'center', minHeight: 52, paddingHorizontal: 13 },
    secondaryButtonText: { color: colors.foreground, fontFamily: 'Inter_700Bold', fontSize: 13 },
    pressed: { opacity: 0.72, transform: [{ scale: 0.985 }] },
    trustRow: { alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: 1, borderTopColor: colors.border, borderTopWidth: 1, flexDirection: 'row', gap: 10, paddingVertical: 15 },
    trustText: { color: colors.mutedForeground, flex: 1, fontFamily: 'Inter_500Medium', fontSize: 12, lineHeight: 18 },
    section: { paddingTop: 56 },
    sectionKicker: { color: colors.accentForeground, fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.7, textTransform: 'uppercase' },
    sectionTitle: { color: colors.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 28, letterSpacing: -1, lineHeight: 33, marginTop: 11 },
    serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 24 },
    serviceCard: { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius, borderWidth: 1, minHeight: 163, padding: 15, width: '48%' },
    iconBox: { alignItems: 'center', backgroundColor: colors.secondary, borderRadius: 9, height: 36, justifyContent: 'center', marginBottom: 22, width: 36 },
    cardTitle: { color: colors.cardForeground, fontFamily: 'Inter_700Bold', fontSize: 14, marginBottom: 7 },
    cardCopy: { color: colors.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16 },
    planCard: { backgroundColor: colors.primary, borderRadius: colors.radius, marginTop: 56, padding: 22 },
    planTopLine: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
    planNumber: { color: colors.accent, fontFamily: 'Inter_700Bold', fontSize: 11 },
    planTitle: { color: colors.primaryForeground, fontFamily: 'Inter_700Bold', fontSize: 29, letterSpacing: -1, lineHeight: 33, marginTop: 18 },
    planCopy: { color: colors.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 21, marginTop: 13 },
    planFacts: { borderTopColor: colors.secondary, borderTopWidth: 1, marginTop: 22, paddingTop: 5 },
    factRow: { alignItems: 'center', borderBottomColor: colors.secondary, borderBottomWidth: 1, flexDirection: 'row', gap: 10, paddingVertical: 13 },
    factText: { color: colors.primaryForeground, fontFamily: 'Inter_500Medium', fontSize: 12 },
    planButton: { alignItems: 'center', backgroundColor: colors.accent, borderRadius: colors.radius, flexDirection: 'row', gap: 9, justifyContent: 'center', marginTop: 22, minHeight: 50 },
    planButtonText: { color: colors.accentForeground, fontFamily: 'Inter_700Bold', fontSize: 13 },
    reasonList: { borderTopColor: colors.border, borderTopWidth: 1, marginTop: 24 },
    reasonRow: { alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', gap: 12, minHeight: 58 },
    reasonNumber: { color: colors.accentForeground, fontFamily: 'Inter_700Bold', fontSize: 10, width: 20 },
    reasonText: { color: colors.foreground, flex: 1, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
    quoteSection: { paddingTop: 56 },
    quoteIntro: { color: colors.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 21, marginTop: 13 },
    contactActions: { flexDirection: 'row', gap: 10, marginTop: 20 },
    contactAction: { alignItems: 'center', backgroundColor: colors.secondary, borderRadius: colors.radius, flex: 1, flexDirection: 'row', gap: 8, justifyContent: 'center', minHeight: 44, paddingHorizontal: 8 },
    contactActionText: { color: colors.accentForeground, fontFamily: 'Inter_600SemiBold', fontSize: 11 },
    formCard: { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius, borderWidth: 1, gap: 11, marginTop: 13, padding: 14 },
    input: { backgroundColor: colors.background, borderColor: colors.input, borderRadius: 8, borderWidth: 1, color: colors.foreground, fontFamily: 'Inter_400Regular', fontSize: 14, minHeight: 48, paddingHorizontal: 13 },
    submitButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: colors.radius, flexDirection: 'row', gap: 8, justifyContent: 'center', minHeight: 54, marginTop: 2, paddingHorizontal: 12 },
    submitButtonText: { color: colors.primaryForeground, flex: 1, fontFamily: 'Inter_700Bold', fontSize: 12, textAlign: 'center' },
    successRow: { alignItems: 'center', backgroundColor: colors.secondary, borderRadius: 8, flexDirection: 'row', gap: 9, padding: 12 },
    successText: { color: colors.secondaryForeground, flex: 1, fontFamily: 'Inter_500Medium', fontSize: 12, lineHeight: 18 },
    footer: { alignItems: 'center', borderTopColor: colors.border, borderTopWidth: 1, marginTop: 58, paddingTop: 30 },
    footerLogo: { height: 43, marginBottom: 15, resizeMode: 'contain', width: 102 },
    footerText: { color: colors.foreground, fontFamily: 'Inter_700Bold', fontSize: 14 },
    footerSubtext: { color: colors.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 7, textAlign: 'center' },
    copyright: { color: colors.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: 25 },
    modalScreen: { backgroundColor: colors.background, flex: 1 },
    modalHeader: { alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 17, paddingTop: 10 },
    modalTitle: { color: colors.foreground, fontFamily: 'Inter_700Bold', fontSize: 24, letterSpacing: -0.7, marginTop: 7 },
    closeButton: { alignItems: 'center', borderColor: colors.border, borderRadius: 999, borderWidth: 1, height: 38, justifyContent: 'center', width: 38 },
    contractContent: { padding: 20, paddingBottom: 50 },
    contractBlock: { marginBottom: 22 },
    contractMainHeading: { color: colors.foreground, fontFamily: 'Inter_700Bold', fontSize: 21, letterSpacing: -0.5, lineHeight: 27, textTransform: 'uppercase' },
    contractHeading: { color: colors.accentForeground, fontFamily: 'Inter_700Bold', fontSize: 12, letterSpacing: 0.6, marginBottom: 8, textTransform: 'uppercase' },
    contractBody: { color: colors.foreground, fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 21 },
    onlineContractButton: { alignItems: 'center', backgroundColor: colors.secondary, borderRadius: colors.radius, flexDirection: 'row', justifyContent: 'center', minHeight: 50, paddingHorizontal: 15 },
    onlineContractText: { color: colors.accentForeground, fontFamily: 'Inter_700Bold', fontSize: 13, marginRight: 9 },
    modalQuoteButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: colors.radius, flexDirection: 'row', justifyContent: 'center', marginTop: 11, minHeight: 52, paddingHorizontal: 15 },
    modalQuoteButtonText: { color: colors.primaryForeground, fontFamily: 'Inter_700Bold', fontSize: 13, marginRight: 9 },
  });
}