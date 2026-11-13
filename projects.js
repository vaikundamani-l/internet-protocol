/* Original guided projects. Download files into separate project directories.
   These bounded teaching implementations are not production services. */
const PROJECTS = [
  {
    id:49,module:11,model:'framing',
    title:{en:'Python TCP framed chat',ta:'Python TCP framing உடன் உரையாடல்'},
    summary:{en:'Build a two-person, turn-taking chat relay with explicit byte framing, bounded messages and bounded frame reads and explicit terminal-input limitations.',ta:'இருவர் மாறிமாறிப் பேசும் chat relay உருவாக்குங்கள். ஒவ்வொரு message-க்கும் தெளிவான byte framing, அளவு வரம்பு, வரம்புள்ள frame reads மற்றும் terminal-input வரம்புகள் ஆகியவற்றைச் செயல்படுத்துங்கள்.'},
    prerequisites:{en:'Python 3.9 or later, three terminals, TCP byte-stream basics, UTF-8 and hexadecimal notation. No external packages or administrator rights are required.',ta:'Python 3.9 அல்லது புதிய பதிப்பு, மூன்று terminal-கள், TCP byte stream பற்றிய அடிப்படை அறிவு, UTF-8 மற்றும் hexadecimal குறியீடு தேவை. வெளிப்புற package அல்லது administrator அனுமதி தேவையில்லை.'},
    objectives:{en:['Implement exact reads and a four-byte network-order length.','Relay complete UTF-8 messages between two clients.','Demonstrate fragmented headers, oversize rejection and clean shutdown.'],ta:['நான்கு byte network-order length மற்றும் தேவையான முழு அளவையும் படிக்கும் முறையைச் செயல்படுத்துதல்.','இரு client-களுக்கிடையே முழுமையான UTF-8 message-களை அனுப்புதல்.','பிரிக்கப்பட்ட header, அளவு மீறல் நிராகரிப்பு, முறையான நிறுத்தம் ஆகியவற்றை நிரூபித்தல்.']},
    sections:[
      {heading:{en:'Milestone 1: define the wire contract',ta:'கட்டம் 1: wire format ஒப்பந்தம்'},body:{en:'TCP delivers ordered bytes, not chat records. Define each record as a four-byte unsigned big-endian payload length followed by exactly that many UTF-8 bytes. Count encoded bytes rather than characters. Limit payloads to 4096 bytes before allocating or decoding them; permit an empty message as a valid turn. The exact-read loop accumulates short reads and raises EOF when the peer closes before the requested count. A zero-length socket read is not an empty chat record. Draw the header and payload separately and predict how the receiver behaves when the header arrives one byte at a time.',ta:'TCP வரிசைப்படுத்தப்பட்ட byte-களையே தருகிறது; chat record எல்லைகளை அது காப்பதில்லை. முதலில் நான்கு byte unsigned big-endian payload length, பின்னர் அந்த அளவிலான UTF-8 byte-கள் என்பதே ஒப்பந்தம். எழுத்துகளின் எண்ணிக்கையை அல்ல, encode செய்யப்பட்ட byte-களின் எண்ணிக்கையைப் பயன்படுத்துங்கள். நினைவகம் ஒதுக்குவதற்கும் decode செய்வதற்கும் முன் payload 4096 byte-களுக்குள் உள்ளதா என்று பார்க்க வேண்டும். காலியான message-மும் ஒரு செல்லுபடியான turn. exact-read loop சிறு பகுதிகளாக வரும் byte-களைச் சேர்க்கிறது; வேண்டிய அளவு வருமுன் peer மூடினால் EOF ஏற்படும். socket read காலியாகத் திரும்புவது காலியான chat record அல்ல. Header-ஐயும் payload-ஐயும் தனியாக வரைந்து, header ஒவ்வொரு byte-ஆக வந்தால் receiver எப்படி செயல்படும் என முன்கணியுங்கள்.'}},
      {heading:{en:'Milestone 2: relay turns without hidden concurrency',ta:'கட்டம் 2: மறைமுக concurrency இல்லாத relay'},body:{en:'The server accepts client A and then client B. A sends first; the server forwards A’s frame to B, then forwards B’s response to A. This deliberately small protocol avoids simultaneous writers and makes ownership of each read obvious. It is a chat conversation, but it is not a broadcast room. The client modes enforce the initial turn and then alternate input and receive. Each frame read has one thirty-second monotonic deadline across its header and payload. Socket writes also have a timeout. Terminal input can still wait indefinitely and does not observe peer disconnects until the next socket operation; use Ctrl+C to leave that prompt. Waiting for the second connection is an explicit server setup state; use Ctrl+C to cancel it. The server handles one pair and exits when either side fails.',ta:'Server முதலில் client A-ஐயும் அடுத்து client B-ஐயும் ஏற்கிறது. A முதலில் அனுப்பும்; server அதன் frame-ஐ B-க்கு அனுப்பிவிட்டு B-யின் பதிலை A-க்கு அனுப்பும். இந்தச் சிறிய protocol ஒரே நேரத்தில் பல writer-கள் செயல்படுவதைத் தவிர்த்து, எந்த read யாருக்குரியது என்பதைத் தெளிவாக்குகிறது. இது உரையாடல்; பலருக்கான broadcast room அல்ல. Client mode-கள் முதல் turn-ஐ நிர்ணயித்து பின்னர் input, receive என்று மாறுகின்றன. ஒவ்வொரு frame read-க்கும் header, payload இரண்டையும் சேர்த்து ஒரே முப்பது-second monotonic deadline உண்டு. Socket writes-க்கும் timeout உண்டு. Terminal input முடிவில்லாமல் காத்திருக்கலாம்; அடுத்த socket operation வரும்வரை peer disconnect தெரியாது. அந்த prompt-இலிருந்து வெளியேற Ctrl+C பயன்படுத்துங்கள். இரண்டாவது இணைப்பிற்காகக் காத்திருப்பது server அமைப்பின் தனிப்பட்ட நிலை; அதை Ctrl+C மூலம் நிறுத்தலாம். Server ஒரு ஜோடியை மட்டுமே கையாளும்; ஒரு முனை தோல்வியடைந்தாலும் வெளியேறும்.'}},
      {heading:{en:'Milestone 3: adversarial acceptance checks',ta:'கட்டம் 3: தவறான உள்ளீட்டுடன் ஏற்றுக்கொள்ளும் சோதனைகள்'},body:{en:'First pass the included socket-pair self-test, which splits a frame into individual writes and verifies reconstruction. Then exchange both English and Tamil text in the three terminals. Acceptance requires three round trips without merged or missing turns, rejection of a four-byte header declaring a 4097-byte payload before reading a body, and visible termination after EOF or timeout. Repeat with an abrupt client exit while the other peer is waiting. Record which endpoint noticed first; forwarding a message does not prove that a human read it. Keep the relay on loopback: the exercise supplies neither identity verification nor encryption. A later extension could add message identifiers and acknowledgments, but document whether they acknowledge relay receipt, client receipt or display.',ta:'முதலில் உள்ள socket-pair self-test-ஐ இயக்குங்கள்; அது ஒரு frame-ஐத் தனித்தனி write-களாகப் பிரித்து மீண்டும் சரியாகச் சேர்வதைச் சோதிக்கிறது. பின்னர் மூன்று terminal-களில் English, Tamil உரைகளைப் பரிமாறுங்கள். மூன்று round trip-களிலும் turn-கள் கலக்காமலும் விடுபடாமலும் இருக்க வேண்டும்; 4097-byte payload நீளத்தைக் குறிப்பிடும் நான்கு-byte header வந்தால் body படிப்பதற்கு முன்பே நிராகரிக்க வேண்டும்; EOF அல்லது timeout-க்கு பிறகு நிறுத்தம் தென்பட வேண்டும். மற்ற peer காத்திருக்கும்போது ஒரு client-ஐ திடீரென்று மூடி மீண்டும் சோதியுங்கள். எந்த முனை முதலில் கண்டது என்று பதிவு செய்யுங்கள்; relay அனுப்பியது மனிதர் வாசித்ததற்கான சான்று அல்ல. Identity verification, encryption இல்லாததால் loopback-லேயே வைத்திருங்கள். பின்னர் message identifier, acknowledgment சேர்க்கலாம்; அது relay பெற்றதையா, client பெற்றதையா, திரையில் காட்டியதையா உறுதிசெய்கிறது என்பதை எழுதுங்கள்.'}}
    ],
    example:{en:'For the message Hi, the wire bytes are 00 00 00 02 48 69. Two consecutive messages require two headers even if one recv returns both. A Tamil character may occupy three UTF-8 bytes, so len(text.encode("utf-8")) is the relevant length.',ta:'Hi என்ற message-ன் wire byte-கள் 00 00 00 02 48 69. தொடர்ச்சியான இரண்டு message-களும் ஒரே recv-ல் கிடைத்தாலும் இரண்டு header-கள் தேவை. ஒரு Tamil எழுத்து மூன்று UTF-8 byte-களைப் பயன்படுத்தலாம்; ஆகவே len(text.encode("utf-8")) என்பதே தேவையான அளவு.'},
    failure:{en:'If B never sends its turn, A waits and the relay times out. This is an application turn-taking stall, not proof of packet loss. Restart the pair and obey the A-first sequence; replacing framing with recv(4096) would only introduce a second bug.',ta:'B தனது turn-ல் அனுப்பாவிட்டால் A காத்திருக்கும்; relay timeout அடையும். இது application-ன் turn காத்திருப்பு; packet loss நடந்ததற்கான சான்றல்ல. ஜோடியை மீண்டும் தொடங்கி A முதலில் அனுப்பும் வரிசையைப் பின்பற்றுங்கள். Framing-க்கு பதில் recv(4096) மட்டும் பயன்படுத்துவது மேலும் ஒரு பிழையை உருவாக்கும்.'},
    lab:{commands:'python3 chat.py test\npython3 chat.py server\n# Terminal 2 / இரண்டாவது terminal\npython3 chat.py a\n# Terminal 3 / மூன்றாவது terminal\npython3 chat.py b',guidance:{en:'Download chat.py. Run the test first, then keep the server and both clients in separate terminals. A types first; B replies after seeing A’s text. Type /quit at your input prompt.',ta:'chat.py-ஐப் பதிவிறக்குங்கள். முதலில் test இயக்கி, பின்னர் server மற்றும் இரண்டு client-களையும் தனித்தனி terminal-களில் இயக்குங்கள். A முதலில் தட்டச்சிடும்; A-வின் உரையைப் பார்த்ததும் B பதிலளிக்கும். உங்கள் input prompt-ல் /quit எனத் தட்டச்சிடலாம்.'},expected:{en:'The test prints PASS; each entered message appears once at the opposite client. Oversize and incomplete frames are rejected, and /quit closes the pair.',ta:'Test PASS எனக் காட்டும்; உள்ளிடும் ஒவ்வொரு message-மும் எதிர் client-ல் ஒருமுறை தோன்றும். அளவு மீறிய, முழுமையற்ற frame-கள் நிராகரிக்கப்படும்; /quit ஜோடியை மூடும்.'},cleanup:{en:'Use /quit or Ctrl+C in all three terminals. No files, accounts or persistent network settings are created.',ta:'மூன்று terminal-களிலும் /quit அல்லது Ctrl+C பயன்படுத்துங்கள். File, account அல்லது நிலையான network அமைப்பு எதுவும் உருவாக்கப்படாது.'}},
    questions:[
      {question:{en:'A four-byte header arrives as 1 byte then 3 bytes. What should happen?',ta:'நான்கு byte header முதலில் 1 byte, பின்னர் 3 byte என வந்தால் என்ன செய்ய வேண்டும்?'},options:{en:['Accumulate all four before unpacking','Decode the first byte as the length','Treat the second read as another message'],ta:['நான்கையும் சேர்த்த பிறகு unpack செய்ய வேண்டும்','முதல் byte-ஐ length என decode செய்ய வேண்டும்','இரண்டாவது read-ஐ வேறு message எனக் கருத வேண்டும்']},answer:0,explanation:{en:'Read boundaries do not identify application records.',ta:'Read எல்லைகள் application record எல்லைகளைக் குறிக்காது.'}},
      {question:{en:'A payload encodes to 12 bytes. How many application wire bytes include its header?',ta:'Payload encode செய்தபின் 12 byte எனில் header உட்பட application wire அளவு என்ன?'},options:{en:['16','12','48'],ta:['16','12','48']},answer:0,explanation:{en:'Four header bytes plus twelve payload bytes equals sixteen, excluding TCP/IP headers.',ta:'நான்கு header byte-களும் பன்னிரண்டு payload byte-களும் சேர்ந்து பதினாறு; TCP/IP header இதில் சேராது.'}},
      {question:{en:'Does relay sendall success prove the receiver displayed the text?',ta:'Relay-யின் sendall வெற்றி, receiver உரையைக் காட்டியதை உறுதிப்படுத்துமா?'},options:{en:['No; a display acknowledgment would be a separate application event','Yes, TCP reads the display','Yes, UTF-8 implies acknowledgment'],ta:['இல்லை; காட்சிப்படுத்திய acknowledgment தனி application நிகழ்வு','ஆம்; TCP திரையைப் படிக்கிறது','ஆம்; UTF-8 acknowledgment தருகிறது']},answer:0,explanation:{en:'A successful send hands bytes to the local networking stack; application consumption is separate.',ta:'Send வெற்றி byte-களை local networking stack ஏற்றதைச் சொல்கிறது; application பயன்படுத்தியது தனி நிகழ்வு.'}}
    ],
    refs:[['Python socket API','https://docs.python.org/3/library/socket.html'],['TCP specification','https://www.rfc-editor.org/rfc/rfc9293.html']],
    files:[{name:'chat.py',content:String.raw`import socket, struct, sys, threading, time

def exact(s, n, deadline):
    data = bytearray()
    while len(data) < n:
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            raise TimeoutError("frame deadline")
        s.settimeout(remaining)
        part = s.recv(n - len(data))
        if not part:
            raise EOFError("incomplete frame / முழுமையற்ற frame")
        data.extend(part)
    return bytes(data)

def receive(s, timeout=30):
    deadline = time.monotonic() + timeout
    n = struct.unpack("!I", exact(s, 4, deadline))[0]
    if n > 4096:
        raise ValueError("oversize / அளவு மீறல்")
    return exact(s, n, deadline).decode("utf-8")

def send(s, text):
    data = text.encode("utf-8")
    if len(data) > 4096:
        raise ValueError("oversize / அளவு மீறல்")
    s.sendall(struct.pack("!I", len(data)) + data)

def main():
    mode = sys.argv[1]
    if mode == "test":
        a, b = socket.socketpair()
        a.settimeout(2); b.settimeout(2)
        def writer():
            for byte in b"\x00\x00\x00\x02Hi":
                a.sendall(bytes([byte]))
        t = threading.Thread(target=writer); t.start()
        assert receive(b) == "Hi"
        t.join()
        a.sendall(struct.pack("!I", 4097))
        try:
            receive(b)
            raise AssertionError("accepted oversize")
        except ValueError:
            pass
        a.close()
        try:
            receive(b)
            raise AssertionError("accepted EOF")
        except EOFError:
            pass
        b.close()
        a, b = socket.socketpair()
        def slow_writer():
            try:
                for byte in b"\x00\x00\x00\x02Hi":
                    a.sendall(bytes([byte])); time.sleep(0.03)
            except OSError:
                pass
        t = threading.Thread(target=slow_writer); t.start()
        started = time.monotonic()
        try:
            receive(b, timeout=0.09)
            raise AssertionError("accepted slow frame")
        except TimeoutError:
            assert time.monotonic() - started < 0.5
        finally:
            b.close(); t.join(); a.close()
        print("PASS"); return
    if mode == "server":
        with socket.socket() as listener:
            listener.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            listener.bind(("127.0.0.1", 9049)); listener.listen(2)
            print("Waiting for A, B / A, B இணைப்புக்காகக் காத்திருக்கிறது", flush=True)
            a, _ = listener.accept()
            with a:
                b, _ = listener.accept()
                with b:
                    a.settimeout(30); b.settimeout(30)
                    while True:
                        send(b, receive(a)); send(a, receive(b))
    elif mode in ("a", "b"):
        with socket.create_connection(("127.0.0.1", 9049), 30) as s:
            if mode == "b":
                print(receive(s))
            while True:
                text = input("You / நீங்கள்: ")
                if text == "/quit":
                    return
                send(s, text); print(receive(s))
    else:
        raise ValueError("server | a | b | test")

if __name__ == "__main__":
    try:
        main()
    except (OSError, EOFError, ValueError, KeyboardInterrupt) as e:
        print("Stopped / நிறுத்தப்பட்டது:", e)
` }]
  },
  {
    id:50,module:11,model:'framing',
    title:{en:'Java framed echo and file transfer',ta:'Java framing உடன் echo மற்றும் file பரிமாற்றம்'},
    summary:{en:'Implement a bounded binary service with an operation byte, explicit lengths and byte-for-byte verification.',ta:'Operation byte, தெளிவான length, byte அளவிலான சரிபார்ப்பு ஆகியவற்றுடன் வரம்புள்ள binary service உருவாக்குங்கள்.'},
    prerequisites:{en:'JDK 11 or later, two terminals, Java streams, exceptions and basic TCP framing. Download Framed.java into an otherwise empty working directory.',ta:'JDK 11 அல்லது புதிய பதிப்பு, இரண்டு terminal-கள், Java stream, exception, அடிப்படை TCP framing அறிவு தேவை. காலியான வேலை directory-ல் Framed.java-ஐப் பதிவிறக்குங்கள்.'},
    objectives:{en:['Specify an operation-plus-length protocol.','Handle partial input with readFully and bounded allocation.','Transfer binary content and verify both acknowledgment and stored bytes.'],ta:['Operation, length கொண்ட protocol-ஐ வரையறுத்தல்.','readFully மற்றும் வரம்புள்ள நினைவக ஒதுக்கீட்டால் பகுதியாக வரும் input-ஐ கையாளுதல்.','Binary உள்ளடக்கத்தைப் பரிமாறி acknowledgment, சேமித்த byte-கள் இரண்டையும் சரிபார்த்தல்.']},
    sections:[
      {heading:{en:'Milestone 1: one protocol, two operations',ta:'கட்டம் 1: ஒரே protocol, இரண்டு operation-கள்'},body:{en:'Each request contains an unsigned operation byte, a signed four-byte big-endian integer length and a payload. Operation 1 echoes bytes; operation 2 writes a new received.bin and returns the ASCII SHA-256 digest. Reject negative lengths, lengths above one MiB and unknown operations before reading the payload. Responses contain only a four-byte length and payload; the client already knows its requested operation. This asymmetry is intentional and must be documented. Use raw bytes for file contents and UTF-8 only for text messages. DataInputStream.readFully either fills the selected array or fails; an ordinary read may return fewer bytes than the requested length.',ta:'ஒவ்வொரு request-லும் unsigned operation byte, signed நான்கு byte big-endian integer length, payload இருக்கும். Operation 1 byte-களை echo செய்கிறது; operation 2 புதிய received.bin-ல் எழுதிவிட்டு ASCII SHA-256 digest தருகிறது. Negative length, ஒரு MiB-ஐ மீறும் length, தெரியாத operation ஆகியவற்றை payload படிப்பதற்கு முன் நிராகரியுங்கள். Response-ல் நான்கு byte length, payload மட்டுமே இருக்கும்; client தான் கேட்ட operation-ஐ ஏற்கனவே அறியும். இந்த வேறுபாடு திட்டமிட்டது; அதை ஆவணப்படுத்த வேண்டும். File-க்கு raw byte-களையும் text-க்கு மட்டும் UTF-8-ஐயும் பயன்படுத்துங்கள். DataInputStream.readFully தேர்ந்த array முழுவதையும் நிரப்பும் அல்லது தோல்வியடையும்; சாதாரண read கேட்ட அளவைவிடக் குறைவாகத் தரலாம்.'}},
      {heading:{en:'Milestone 2: make storage behavior explicit',ta:'கட்டம் 2: சேமிப்பு நடத்தையைத் தெளிவாக்குதல்'},body:{en:'The receiver accepts no remote filename, so the sender cannot request arbitrary filesystem paths. CREATE_NEW refuses to overwrite an existing received.bin. Run the server in a dedicated directory and inspect that file after a successful upload. This small exercise buffers at most one MiB in memory and handles one connection at a time. The server has a five-second read timeout and reports per-connection errors while continuing to listen. A second upload should fail until you intentionally remove the previous output. Do not interpret that failure as a network fault. The supplied fixture contains all byte values repeatedly, exposing accidental text conversion and newline transformations.',ta:'Receiver remote filename எதையும் ஏற்காது; ஆகவே sender விரும்பிய filesystem path-ல் எழுதச் சொல்ல முடியாது. CREATE_NEW ஏற்கனவே இருக்கும் received.bin-ஐ மேலெழுத மறுக்கும். தனியான directory-ல் server இயக்கி வெற்றிகரமான upload-க்குப் பிறகு அந்த file-ஐப் பாருங்கள். இந்தச் சிறிய பயிற்சி அதிகபட்சம் ஒரு MiB-ஐ memory-ல் வைத்துக் கொண்டு ஒரே நேரத்தில் ஒரு connection-ஐ கையாளும். Server read timeout ஐந்து விநாடி; ஒவ்வொரு connection பிழையையும் காட்டிவிட்டு தொடர்ந்து கேட்கும். முந்தைய output-ஐ நீங்கள் நீக்கும் வரை இரண்டாவது upload தோல்வியடைய வேண்டும். அதை network பிழை எனக் கருத வேண்டாம். வழங்கப்பட்ட fixture எல்லா byte மதிப்புகளையும் மீண்டும் மீண்டும் கொண்டிருப்பதால் தவறான text conversion, newline மாற்றங்கள் தெரியவரும்.'}},
      {heading:{en:'Milestone 3: verify, then challenge the limits',ta:'கட்டம் 3: சரிபார்த்து வரம்புகளைச் சோதித்தல்'},body:{en:'Acceptance starts with an English or Tamil echo that exactly matches its input. Next generate the binary fixture, upload it, compare the returned digest with the locally computed digest and compare received.bin directly with fixture.bin. The digest acknowledgment means the receiver reached its hash step after writing; it does not promise crash-durable storage. Test a second upload to confirm overwrite refusal, then remove only the generated output and retry. Finally review the negative-length and size checks and send a deliberately truncated request as an extension. A stalled peer should hit the read timeout rather than wait forever. Keep the listener on loopback; a digest sent over unauthenticated TCP provides corruption detection in this exercise, not protection against an active attacker.',ta:'English அல்லது Tamil echo உள்ளீட்டுடன் அப்படியே பொருந்துவது முதல் ஏற்றுக்கொள்ளும் சோதனை. பின்னர் binary fixture உருவாக்கி upload செய்து, திரும்பிய digest-ஐ local digest-உடனும் received.bin-ஐ fixture.bin-உடனும் நேரடியாக ஒப்பிடுங்கள். Digest acknowledgment என்பது எழுதிவிட்டு hash கட்டத்தை receiver அடைந்ததைக் குறிக்கும்; crash ஏற்பட்டாலும் disk-ல் நிலைத்திருக்கும் உறுதி அல்ல. இரண்டாவது upload மேலெழுத மறுப்பதை உறுதிசெய்து, உருவான output மட்டும் நீக்கி மீண்டும் முயலுங்கள். Negative length, size check-களை ஆய்வு செய்து, விரிவாக்கப் பயிற்சியாக முழுமையற்ற request அனுப்புங்கள். செயலற்ற peer read timeout அடைய வேண்டும்; முடிவில்லாமல் காத்திருக்கக் கூடாது. Listener loopback-ல் இருக்கட்டும்; authentication இல்லாத TCP வழியாக வரும் digest இங்கு corruption கண்டறிய உதவும், செயலில் உள்ள attacker-ஐ தடுக்காது.'}}
    ],
    example:{en:'A three-byte echo request uses 1 operation byte + 4 length bytes + 3 payload bytes = 8 application bytes. Its response uses 7 bytes. The 65,536-byte fixture fits the 1,048,576-byte limit; SHA-256 is returned as 64 hexadecimal ASCII characters.',ta:'மூன்று byte echo request-க்கு 1 operation byte + 4 length byte + 3 payload byte = 8 application byte தேவை. பதில் 7 byte. 65,536-byte fixture, 1,048,576-byte வரம்புக்குள் உள்ளது; SHA-256 பதில் 64 hexadecimal ASCII எழுத்துகளாக வரும்.'},
    failure:{en:'If received.bin already exists, CREATE_NEW fails and the client sees EOF rather than an acknowledgment. Preserve the existing file, explain the storage conflict, and remove it only when ready to repeat the upload.',ta:'received.bin ஏற்கனவே இருந்தால் CREATE_NEW தோல்வியடைந்து client-க்கு acknowledgment-க்கு பதில் EOF கிடைக்கும். இருக்கும் file-ஐப் பாதுகாத்து, சேமிப்பு முரண்பாட்டை விளக்குங்கள்; upload மீண்டும் செய்யத் தயாரானபோது மட்டும் நீக்குங்கள்.'},
    lab:{commands:'javac Framed.java\njava Framed server\n# Terminal 2 / இரண்டாவது terminal\njava Framed echo "வணக்கம் TCP"\njava Framed fixture\njava Framed file fixture.bin\njava Framed verify',guidance:{en:'Keep the server running in terminal one. Execute the remaining commands in terminal two in the same dedicated directory. Repeat file mode once to observe overwrite refusal.',ta:'முதல் terminal-ல் server ஓடட்டும். அதே தனி directory-ல் இரண்டாவது terminal வழியாக மீதமுள்ள command-களை இயக்குங்கள். மேலெழுத மறுப்பதைப் பார்க்க file mode-ஐ மீண்டும் ஒருமுறை இயக்குங்கள்.'},expected:{en:'Echo prints the original text; file prints matching digests and true; verify prints true for complete byte equality. A repeated upload is refused.',ta:'Echo அசல் உரையைக் காட்டும்; file பொருந்தும் digest-களையும் true-ஐயும் காட்டும்; verify முழு byte சமத்துவத்துக்கு true காட்டும். மீண்டும் upload செய்வது மறுக்கப்படும்.'},cleanup:{en:'Stop the server with Ctrl+C. Remove only generated Framed.class, fixture.bin and received.bin from the dedicated directory when finished.',ta:'Ctrl+C மூலம் server-ஐ நிறுத்துங்கள். முடிந்தபின் தனி directory-ல் உருவான Framed.class, fixture.bin, received.bin மட்டும் நீக்குங்கள்.'}},
    questions:[
      {question:{en:'Why use readFully for the body?',ta:'Body-க்கு readFully ஏன் தேவை?'},options:{en:['A single ordinary read can be short','It encrypts the stream','It removes the need for a length'],ta:['ஒரு சாதாரண read குறைவான byte-களைத் தரலாம்','அது stream-ஐ encrypt செய்கிறது','அது length தேவையை நீக்குகிறது']},answer:0,explanation:{en:'TCP read sizes are independent of application writes.',ta:'TCP read அளவுகள் application write அளவுகளிலிருந்து சுயாதீனமானவை.'}},
      {question:{en:'Echo works; the second upload fails with FileAlreadyExistsException. Diagnose it.',ta:'Echo வேலை செய்கிறது; இரண்டாவது upload FileAlreadyExistsException காட்டுகிறது. காரணம் என்ன?'},options:{en:['The storage no-overwrite policy is working','DNS is broken','TCP cannot carry binary bytes'],ta:['மேலெழுதாத storage கொள்கை செயல்படுகிறது','DNS பழுதடைந்துள்ளது','TCP binary byte-களை அனுப்ப முடியாது']},answer:0,explanation:{en:'The receiver deliberately uses CREATE_NEW for its fixed output path.',ta:'Receiver திட்டமிட்டு அதன் நிர்ணயிக்கப்பட்ட output path-க்கு CREATE_NEW பயன்படுத்துகிறது.'}},
      {question:{en:'What must be checked before allocating the payload array?',ta:'Payload array-க்கு memory ஒதுக்குவதற்கு முன் என்ன சோதிக்க வேண்டும்?'},options:{en:['Length is between zero and the configured limit','Length is prime','The filename ends in .txt'],ta:['Length பூஜ்யத்திலிருந்து நிர்ணயித்த வரம்புக்குள் உள்ளதா','Length ஒரு பகா எண்ணா','Filename .txt என முடிகிறதா']},answer:0,explanation:{en:'A signed integer may be negative and a positive value may still exhaust memory.',ta:'Signed integer negative-ஆக இருக்கலாம்; positive மதிப்பும் memory-ஐ நிரப்பிவிடலாம்.'}}
    ],
    refs:[['Java DataInputStream','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/DataInputStream.html'],['Java Files','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Files.html']],
    files:[{name:'Framed.java',content:String.raw`import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.security.*;
import java.util.Arrays;

public class Framed {
    static final int MAX = 1048576;
    static byte[] read(DataInputStream in) throws IOException {
        int n = in.readInt();
        if (n < 0 || n > MAX) throw new IOException("length / அளவு");
        byte[] b = new byte[n]; in.readFully(b); return b;
    }
    static void write(DataOutputStream out, byte[] b) throws IOException {
        if (b.length > MAX) throw new IOException("oversize / அளவு மீறல்");
        out.writeInt(b.length); out.write(b); out.flush();
    }
    static String hash(byte[] b) throws Exception {
        StringBuilder s = new StringBuilder();
        for (byte v : MessageDigest.getInstance("SHA-256").digest(b))
            s.append(String.format("%02x", v & 255));
        return s.toString();
    }
    public static void main(String[] args) throws Exception {
        String mode = args[0];
        if (mode.equals("fixture")) {
            byte[] b = new byte[65536];
            for (int i=0; i<b.length; i++) b[i]=(byte)i;
            Files.write(Path.of("fixture.bin"), b, StandardOpenOption.CREATE_NEW);
            return;
        }
        if (mode.equals("verify")) {
            System.out.println(Arrays.equals(Files.readAllBytes(Path.of("fixture.bin")),
                Files.readAllBytes(Path.of("received.bin")))); return;
        }
        if (mode.equals("server")) {
            try (ServerSocket listener = new ServerSocket()) {
                listener.bind(new InetSocketAddress("127.0.0.1", 9050));
                System.out.println("Ready / தயார்");
                while (true) {
                    try (Socket s = listener.accept()) {
                        s.setSoTimeout(5000);
                        DataInputStream in = new DataInputStream(s.getInputStream());
                        DataOutputStream out = new DataOutputStream(s.getOutputStream());
                        int op = in.readUnsignedByte();
                        if (op != 1 && op != 2) throw new IOException("operation / செயல்");
                        byte[] b = read(in);
                        if (op == 2) {
                            Files.write(Path.of("received.bin"), b, StandardOpenOption.CREATE_NEW);
                            b = hash(b).getBytes(StandardCharsets.US_ASCII);
                        }
                        write(out, b);
                    } catch (Exception e) { System.err.println("Rejected / மறுக்கப்பட்டது: " + e); }
                }
            }
        }
        if (!mode.equals("echo") && !mode.equals("file"))
            throw new IllegalArgumentException("server | echo text | fixture | file path | verify");
        Path path = mode.equals("file") ? Path.of(args[1]) : null;
        if (path != null && Files.size(path) > MAX) throw new IOException("oversize");
        byte[] b = path == null ? args[1].getBytes(StandardCharsets.UTF_8) : Files.readAllBytes(path);
        try (Socket s = new Socket()) {
            s.connect(new InetSocketAddress("127.0.0.1", 9050), 5000); s.setSoTimeout(5000);
            DataOutputStream out = new DataOutputStream(s.getOutputStream());
            out.writeByte(path == null ? 1 : 2); write(out, b);
            byte[] response = read(new DataInputStream(s.getInputStream()));
            String text = new String(response, StandardCharsets.UTF_8);
            System.out.println(text);
            System.out.println(path == null ? Arrays.equals(b, response) : hash(b).equals(text));
        }
    }
}
` }]
  },
  {
    id:51,module:11,model:'tcp',
    title:{en:'Resumable LAN sharing with checksums and authentication',ta:'Checksum, authentication உடன் மீண்டும் தொடரக்கூடிய LAN பகிர்வு'},
    summary:{en:'Download one fixed object in authenticated chunks; validate an existing prefix and publish the output only after full SHA-256 verification.',ta:'ஒரு நிர்ணயிக்கப்பட்ட object-ஐ authentication கொண்ட chunk-களாகப் பதிவிறக்குங்கள். ஏற்கனவே உள்ள prefix-ஐச் சரிபார்த்து, முழு SHA-256 பொருந்திய பிறகே output-ஐ வெளியிடுங்கள்.'},
    prerequisites:{en:'Python 3.9+, HTTP request basics, SHA-256 and a private working directory. Start on loopback. LAN deployment requires a separately configured authenticated encrypted tunnel.',ta:'Python 3.9+, HTTP request அடிப்படை, SHA-256, தனி வேலை directory தேவை. Loopback-ல் தொடங்குங்கள். LAN-ல் இயக்க தனியாக அமைக்கப்பட்ட அடையாளம் உறுதிசெய்யப்பட்ட encrypted tunnel தேவை.'},
    objectives:{en:['Authenticate metadata and chunk requests with a shared token.','Resume only when source identity and prefix checksum agree.','Reject corrupt partial data and verify the final object before rename.'],ta:['பகிர்ந்த token மூலம் metadata, chunk request-களுக்கு authentication செய்தல்.','Source identity, prefix checksum இரண்டும் பொருந்தினால் மட்டும் தொடருதல்.','கெட்ட partial data-ஐ நிராகரித்து rename செய்வதற்கு முன் முழு object-ஐச் சரிபார்த்தல்.']},
    sections:[
      {heading:{en:'Milestone 1: restrict the object and trust boundary',ta:'கட்டம் 1: object மற்றும் நம்பிக்கை எல்லையை வரையறுத்தல்'},body:{en:'The server loads one explicit source file, up to eight MiB, into an immutable snapshot at startup. It never accepts a remote filename. Every request supplies a shared token through an HTTP header; compare tokens with compare_digest and omit request logging so credentials do not appear in access logs. Require at least sixteen token characters, generated using secrets rather than a memorable password. Authentication here is a small access-control exercise, not a secure channel: HTTP exposes the token to anyone able to observe that path. Keep the default loopback binding. To share across an authorized LAN, carry this loopback service through an authenticated encrypted tunnel; do not simply bind it to every interface.',ta:'Server தொடங்கும்போது குறிப்பிடப்பட்ட ஒரே source file-ஐ, அதிகபட்சம் எட்டு MiB வரை, மாற்றமில்லாத snapshot-ஆக memory-ல் ஏற்றுகிறது. Remote filename ஏதும் ஏற்காது. ஒவ்வொரு request-லும் HTTP header வழியாக பகிர்ந்த token வரும்; compare_digest மூலம் ஒப்பிட்டு, credential access log-ல் பதியாமல் request logging-ஐத் தவிர்க்கிறது. நினைவில் வைத்திருக்கும் password-க்கு பதில் secrets மூலம் உருவான குறைந்தது பதினாறு எழுத்து token தேவை. இங்குள்ள authentication சிறிய access-control பயிற்சி; பாதுகாப்பான channel அல்ல. பாதையைப் பார்க்கக்கூடியவருக்கு HTTP token தெரியலாம். Default loopback binding-ஐ வைத்திருங்கள். அனுமதியுள்ள LAN-ல் பகிர இந்த loopback service-ஐ authentication கொண்ட encrypted tunnel வழியாக எடுத்துச் செல்லுங்கள்; எல்லா interface-களிலும் நேரடியாக bind செய்ய வேண்டாம்.'}},
      {heading:{en:'Milestone 2: negotiate a trustworthy offset',ta:'கட்டம் 2: நம்பத்தகுந்த offset முடிவுசெய்தல்'},body:{en:'The metadata endpoint returns the snapshot size and full SHA-256 digest. A chunk request supplies an offset and the SHA-256 digest of the client’s current prefix. The server hashes its own prefix at that offset and returns conflict if the two disagree. Thus length alone never authorizes resume. The chunk response includes its own digest; the client checks it before appending. The client stores an identity sidecar containing source size and full digest. A changed snapshot is rejected even if its length is unchanged. These checks intentionally trade efficiency for clarity: repeatedly hashing the growing prefix is expensive for large files, which is why this version caps the source size.',ta:'Metadata endpoint snapshot size, முழு SHA-256 digest ஆகியவற்றைத் தருகிறது. Chunk request-ல் offset, client-ன் தற்போதைய prefix-ன் SHA-256 digest இருக்கும். அந்த offset வரை server தனது prefix-ஐ hash செய்து பொருந்தாவிட்டால் conflict தருகிறது. ஆகவே length மட்டும் resume-க்கு அனுமதி தராது. Chunk response-க்கும் தனி digest உண்டு; append செய்வதற்கு முன் client அதைச் சோதிக்கும். Source size, முழு digest கொண்ட identity sidecar-ஐ client சேமிக்கும். Length மாறாவிட்டாலும் snapshot மாறியிருந்தால் மறுக்கும். இந்தச் சோதனைகள் செயல்திறனைவிடத் தெளிவுக்கு முன்னுரிமை தருகின்றன. வளர்ந்து வரும் prefix-ஐ மீண்டும் மீண்டும் hash செய்வது பெரிய file-களுக்கு செலவானது; அதனால்தான் இந்தப் பதிப்பில் source அளவுக்கு வரம்பு உள்ளது.'}},
      {heading:{en:'Milestone 3: interrupt, resume and publish',ta:'கட்டம் 3: இடைநிறுத்தி, தொடர்ந்து, வெளியிடுதல்'},body:{en:'The --pause option exits normally after a chosen number of chunks, leaving a reproducible partial download. Run it with one chunk, inspect the .part length, then rerun without the option. Existing partial data is never silently discarded. After the final byte, check the complete digest and atomically replace the final path on the same filesystem. The lab refuses a pre-existing final file at startup; use a dedicated output name. Acceptance requires a 65,536-byte first prefix, a resumed final file matching the source digest, a rejected wrong token, and rejection after deliberate partial-file corruption. A failed chunk or interrupted request must leave the previously verified prefix intact. This application recovery is distinct from TCP retransmission inside a single connection.',ta:'--pause தேர்வு குறிப்பிட்ட chunk எண்ணிக்கைக்குப் பிறகு சாதாரணமாக வெளியேறி மீண்டும் சோதிக்கக்கூடிய partial download-ஐ விடுகிறது. ஒரு chunk-உடன் இயக்கி .part அளவைப் பாருங்கள்; பின்னர் அந்தத் தேர்வு இல்லாமல் மீண்டும் இயக்குங்கள். ஏற்கனவே உள்ள partial data அமைதியாக நீக்கப்படாது. கடைசி byte-க்கு பிறகு முழு digest-ஐச் சரிபார்த்து, அதே filesystem-ல் final path-க்கு atomic replace செய்யுங்கள். தொடக்கத்திலேயே final file இருந்தால் lab மறுக்கும்; தனி output பெயர் பயன்படுத்துங்கள். முதல் prefix 65,536 byte ஆகவும், resume செய்த final file source digest-உடன் பொருந்தவும் வேண்டும். தவறான token, திட்டமிட்ட partial corruption இரண்டும் மறுக்கப்பட வேண்டும். தோல்வியடைந்த chunk அல்லது துண்டிக்கப்பட்ட request, முன்பு சரிபார்க்கப்பட்ட prefix-ஐ மாற்றக்கூடாது. இந்த application recovery, ஒரே connection-க்குள் TCP செய்யும் retransmission-இலிருந்து வேறானது.'}}
    ],
    example:{en:'For a 200,000-byte object and 65,536-byte chunks, pausing after one chunk leaves offset 65,536. The remaining transfers contain 65,536, 65,536 and 3,392 bytes. The final digest covers all 200,000 bytes, not just the last response.',ta:'200,000-byte object-க்கு 65,536-byte chunk பயன்படுத்தினால் முதல் chunk-க்கு பிறகு offset 65,536. மீதமுள்ள பரிமாற்றங்கள் 65,536, 65,536, 3,392 byte-கள் கொண்டவை. Final digest கடைசி response-ஐ மட்டும் அல்ல, 200,000 byte-கள் அனைத்தையும் உள்ளடக்கும்.'},
    failure:{en:'A same-length corrupted .part must produce HTTP 409 on the next chunk request. Do not bypass the check by trusting file size; preserve evidence and restart with a different output name or intentionally remove the partial and sidecar.',ta:'அதே length கொண்ட கெட்ட .part இருந்தால் அடுத்த chunk request HTTP 409 தர வேண்டும். File size-ஐ மட்டும் நம்பிச் சோதனையைத் தவிர்க்க வேண்டாம். சான்றைப் பாதுகாத்து வேறு output பெயரில் தொடங்குங்கள் அல்லது partial, sidecar இரண்டையும் தெரிந்தே நீக்குங்கள்.'},
    lab:{commands:'python3 share.py fixture\nexport SHARE_TOKEN=$(python3 -c "import secrets; print(secrets.token_hex(16))")\npython3 share.py server source.bin\n# Terminal 2: copy the SAME token securely into SHARE_TOKEN.\n# இரண்டாவது terminal: அதே token-ஐ SHARE_TOKEN-ல் பாதுகாப்பாக அமைக்கவும்.\npython3 share.py get output.bin --pause 1\npython3 share.py get output.bin\npython3 share.py verify source.bin output.bin',guidance:{en:'Download share.py. Set the identical token in both terminals without posting it in a report. To test corruption, use a new output name with --pause 1, alter one byte in its .part using a local editor, and resume. For a wrong-token test, change the client environment only.',ta:'share.py-ஐப் பதிவிறக்குங்கள். இரு terminal-களிலும் அதே token அமைக்கவும்; அறிக்கையில் அதை வெளியிட வேண்டாம். Corruption சோதனைக்கு புதிய output பெயரில் --pause 1 பயன்படுத்தி அதன் .part-ல் local editor மூலம் ஒரு byte மாற்றிவிட்டு resume செய்யுங்கள். தவறான token சோதனைக்கு client environment மட்டும் மாற்றுங்கள்.'},expected:{en:'The pause prints offset 65536; resume prints VERIFIED and verify prints True. Wrong credentials return 401; corrupt prefixes return 409; changed identities stop before append.',ta:'Pause offset 65536 காட்டும்; resume VERIFIED காட்டும்; verify True காட்டும். தவறான credential 401, கெட்ட prefix 409 தரும்; identity மாறினால் append-க்கு முன்பே நிற்கும்.'},cleanup:{en:'Ctrl+C stops the server. Unset SHARE_TOKEN in both terminals. Remove only generated source.bin, output.bin and any chosen .part/.meta test artifacts.',ta:'Ctrl+C server-ஐ நிறுத்தும். இரு terminal-களிலும் SHARE_TOKEN-ஐ unset செய்யுங்கள். உருவாக்கப்பட்ட source.bin, output.bin, நீங்கள் தேர்ந்த .part/.meta சோதனை file-களை மட்டும் நீக்குங்கள்.'}},
    questions:[
      {question:{en:'Why is matching partial-file length insufficient?',ta:'Partial file length பொருந்துவது மட்டும் ஏன் போதாது?'},options:{en:['Different bytes can have the same length','TCP always changes file size','SHA-256 requires filenames'],ta:['வேறு byte-களுக்கும் ஒரே length இருக்கலாம்','TCP எப்போதும் file size மாற்றும்','SHA-256-க்கு filename தேவை']},answer:0,explanation:{en:'Prefix checksums tie the offset to actual content.',ta:'Prefix checksum offset-ஐ உண்மையான உள்ளடக்கத்துடன் இணைக்கிறது.'}},
      {question:{en:'After 65,536 of 200,000 bytes, how many remain?',ta:'200,000 byte-களில் 65,536 வந்தபின் எவ்வளவு மீதம்?'},options:{en:['134,464','65,536','200,000'],ta:['134,464','65,536','200,000']},answer:0,explanation:{en:'Subtract the verified prefix from the total size.',ta:'மொத்த அளவிலிருந்து சரிபார்த்த prefix அளவைக் கழிக்க வேண்டும்.'}},
      {question:{en:'Does a token over cleartext HTTP protect against a path observer?',ta:'Cleartext HTTP வழியாக வரும் token பாதையைப் பார்ப்பவரிடமிருந்து பாதுகாக்குமா?'},options:{en:['No; use an authenticated encrypted channel for LAN sharing','Yes; hashing the file encrypts headers','Yes; a random token cannot be captured'],ta:['இல்லை; LAN பகிர்வுக்கு authentication கொண்ட encrypted channel தேவை','ஆம்; file hashing header-ஐ encrypt செய்கிறது','ஆம்; random token-ஐ capture செய்ய முடியாது']},answer:0,explanation:{en:'A bearer token can be reused by someone who learns it.',ta:'Bearer token-ஐ அறிந்தவர் அதை மீண்டும் பயன்படுத்தலாம்.'}}
    ],
    refs:[['Python HTTP server','https://docs.python.org/3/library/http.server.html'],['Python hmac compare_digest','https://docs.python.org/3/library/hmac.html'],['HTTP semantics','https://www.rfc-editor.org/rfc/rfc9110.html']],
    files:[{name:'share.py',content:String.raw`import argparse, hashlib, hmac, http.server, json, os
from pathlib import Path
import urllib.request, urllib.parse

def digest(b):
    return hashlib.sha256(b).hexdigest()

def main():
    p = argparse.ArgumentParser()
    p.add_argument("mode", choices=["fixture", "server", "get", "verify"])
    p.add_argument("paths", nargs="*"); p.add_argument("--pause", type=int, default=0)
    a = p.parse_args()
    if a.mode == "fixture":
        with open("source.bin", "xb") as f: f.write(bytes(range(256))*781 + bytes(range(64)))
        return
    if a.mode == "verify":
        print(digest(Path(a.paths[0]).read_bytes()) == digest(Path(a.paths[1]).read_bytes())); return
    token = os.environ.get("SHARE_TOKEN", "")
    if len(token) < 16 or not token.isascii():
        raise ValueError("ASCII token >=16 / குறைந்தது 16 ASCII எழுத்து token தேவை")
    if a.mode == "server":
        source = Path(a.paths[0])
        if source.stat().st_size > 8*1024*1024: raise ValueError("source too large")
        data = source.read_bytes()
        if len(data) > 8*1024*1024: raise ValueError("source grew")
        identity = {"size":len(data), "sha256":digest(data)}
        class Handler(http.server.BaseHTTPRequestHandler):
            def log_message(self, *args): pass
            def setup(self):
                super().setup(); self.connection.settimeout(5)
            def do_GET(self):
                if not hmac.compare_digest(self.headers.get("X-Token", "").encode(), token.encode()):
                    self.send_error(401); return
                u = urllib.parse.urlsplit(self.path)
                if u.path == "/meta":
                    body = json.dumps(identity).encode()
                elif u.path == "/chunk":
                    try:
                        q = urllib.parse.parse_qs(u.query)
                        offset = int(q["offset"][0]); prefix = q["prefix"][0]
                        if not 0 <= offset <= len(data): raise ValueError()
                    except (KeyError, ValueError):
                        self.send_error(400); return
                    if not hmac.compare_digest(digest(data[:offset]), prefix):
                        self.send_error(409); return
                    body = data[offset:offset+65536]
                else:
                    self.send_error(404); return
                self.send_response(200); self.send_header("Content-Length", str(len(body)))
                self.send_header("X-SHA256", digest(body)); self.end_headers(); self.wfile.write(body)
        with http.server.HTTPServer(("127.0.0.1", 9051), Handler) as s:
            print("Ready / தயார்", identity, flush=True); s.serve_forever()
        return
    def request(path):
        req = urllib.request.Request("http://127.0.0.1:9051" + path, headers={"X-Token":token})
        with urllib.request.urlopen(req, timeout=5) as r:
            b = r.read(1048577)
            if len(b) > 1048576 or digest(b) != r.headers.get("X-SHA256"):
                raise ValueError("response checksum / response checksum பொருந்தவில்லை")
            return b
    target = Path(a.paths[0]); part = Path(str(target)+".part"); meta = Path(str(target)+".meta")
    if target.exists(): raise ValueError("final output exists / இறுதி file உள்ளது")
    identity = json.loads(request("/meta"))
    if meta.exists():
        if json.loads(meta.read_text()) != identity: raise ValueError("source changed / source மாறியது")
    else:
        if part.exists(): raise ValueError("partial without identity / identity இல்லாத partial")
        with meta.open("x") as f: json.dump(identity, f)
    if not part.exists(): part.touch(exist_ok=False)
    count = 0
    while part.stat().st_size < identity["size"]:
        prefix = part.read_bytes(); offset = len(prefix)
        body = request("/chunk?" + urllib.parse.urlencode({"offset":offset,"prefix":digest(prefix)}))
        if not body or offset+len(body) > identity["size"]: raise ValueError("bad chunk")
        with part.open("ab") as f: f.write(body)
        count += 1
        if a.pause and count >= a.pause:
            print("Paused / இடைநிறுத்தம்", part.stat().st_size); return
    if part.stat().st_size != identity["size"] or digest(part.read_bytes()) != identity["sha256"]:
        raise ValueError("final checksum / இறுதி checksum பொருந்தவில்லை")
    os.replace(part, target); meta.unlink(); print("VERIFIED / சரிபார்க்கப்பட்டது")

if __name__ == "__main__":
    try: main()
    except KeyboardInterrupt: print("Stopped / நிறுத்தப்பட்டது")
` }]
  },
  {
    id:52,module:11,model:'routing',
    title:{en:'Evidence-first network diagnostic CLI',ta:'சான்றின் அடிப்படையிலான network diagnostic CLI'},
    summary:{en:'Separate name resolution, per-address TCP connection and application response instead of reducing every failure to ping.',ta:'ஒவ்வொரு தோல்வியையும் ping முடிவாகச் சுருக்காமல், name resolution, ஒவ்வொரு address-க்கும் TCP connection, application response ஆகியவற்றைத் தனியே ஆராயுங்கள்.'},
    prerequisites:{en:'Python 3.9+, JSON familiarity, a terminal and permission to contact the endpoint being tested. The default target is your own loopback HTTP server.',ta:'Python 3.9+, JSON பற்றிய அறிவு, terminal, சோதிக்கும் endpoint-ஐ அணுக அனுமதி தேவை. Default target உங்கள் loopback HTTP server ஆகும்.'},
    objectives:{en:['Emit structured evidence for resolution and every candidate address.','Distinguish TCP reachability from HTTP application success.','Preserve uncertainty and compare a controlled success with a refused port.'],ta:['Resolution, ஒவ்வொரு candidate address பற்றிய சான்றையும் கட்டமைப்புடன் வெளியிடுதல்.','TCP அணுகல், HTTP application வெற்றி இரண்டையும் வேறுபடுத்துதல்.','தெரியாததைத் தெளிவாகக் குறிப்பிட்டு கட்டுப்படுத்தப்பட்ட வெற்றி, மறுக்கப்பட்ட port ஆகியவற்றை ஒப்பிடுதல்.']},
    sections:[
      {heading:{en:'Milestone 1: define a modest diagnostic claim',ta:'கட்டம் 1: அளவான diagnostic முடிவை வரையறுத்தல்'},body:{en:'The CLI accepts a host and port, resolves AF_UNSPEC stream addresses and deduplicates candidate socket addresses. It prints one JSON object for resolution and another for each connection attempt. Include the address family, destination, stage, elapsed time and exception class. A successful resolver result proves only that the local resolver supplied an address; it does not prove authoritative DNS correctness or route reachability. Numeric loopback avoids external dependencies in the acceptance lab. Record Python version, operating system, command and time alongside output when collecting evidence. Avoid changing routes or firewalls merely because one attempt failed; first establish which stage failed and whether other addresses succeeded.',ta:'CLI host, port ஏற்று AF_UNSPEC stream address-களை resolve செய்து ஒரே candidate socket address மீண்டும் வருவதை நீக்குகிறது. Resolution-க்கு ஒரு JSON object, ஒவ்வொரு connection முயற்சிக்கும் இன்னொரு object காட்டுகிறது. Address family, destination, stage, எடுத்த நேரம், exception வகை ஆகியவற்றைச் சேர்க்கிறது. Resolver வெற்றி local resolver address கொடுத்ததை மட்டுமே காட்டும்; authoritative DNS சரியானதையோ route வழியாக அணுக முடிவதையோ உறுதிசெய்யாது. Acceptance lab-ல் numeric loopback பயன்படுத்துவதால் வெளிப்புற சார்பு இல்லை. சான்று சேகரிக்கும்போது Python version, operating system, command, நேரம் ஆகியவற்றையும் பதிவு செய்யுங்கள். ஒரு முயற்சி தோல்வியடைந்ததற்காக உடனே route அல்லது firewall மாற்ற வேண்டாம்; எந்தக் கட்டம் தோல்வியடைந்தது, மற்ற address-கள் வென்றனவா என்பதை முதலில் கண்டறியுங்கள்.'}},
      {heading:{en:'Milestone 2: make each stage observable',ta:'கட்டம் 2: ஒவ்வொரு கட்டத்தையும் காணக்கூடியதாக்குதல்'},body:{en:'Measure connection duration with a monotonic timer around connect, separately from the resolver duration. Apply a two-second socket timeout to each candidate and close every socket with a context manager. This bounds individual connection and response operations, not the operating system resolver itself. The total runtime can exceed two seconds when several addresses are attempted. With --http, send a small HTTP/1.0 HEAD request and collect only the first response line, capped at 1024 bytes. Read incrementally because even a short status line can arrive across multiple reads. HTTP mode is for an explicitly selected plaintext HTTP service; sending it to a TLS port is not a valid HTTPS test.',ta:'Connect-ஐச் சுற்றி monotonic timer வைத்து connection நேரத்தை அளவிடுங்கள்; resolver நேரத்தைத் தனியே வைத்திருங்கள். ஒவ்வொரு candidate-க்கும் இரண்டு விநாடி socket timeout அமைத்து context manager மூலம் எல்லா socket-களையும் மூடுங்கள். இது தனிப்பட்ட connection, response operation நேரத்தை வரம்பிடும்; operating system resolver-ஐ அல்ல. பல address-களை முயற்சித்தால் மொத்த நேரம் இரண்டு விநாடியைத் தாண்டலாம். --http உடன் சிறிய HTTP/1.0 HEAD request அனுப்பி முதல் response line மட்டும், அதிகபட்சம் 1024 byte வரை, சேகரிக்கிறது. சிறிய status line கூட பல read-களில் வரலாம்; ஆகவே படிப்படியாகச் சேர்க்க வேண்டும். HTTP mode தெளிவாகத் தேர்ந்த plaintext HTTP service-க்கானது; TLS port-க்கு இதை அனுப்புவது சரியான HTTPS சோதனை அல்ல.'}},
      {heading:{en:'Milestone 3: diagnose without overclaiming',ta:'கட்டம் 3: ஆதாரத்தை மீறாமல் காரணம் கண்டறிதல்'},body:{en:'Start a local HTTP server, obtain a successful connection and a status line, then stop the server and repeat exactly the same command. A refusal often means no listener or an explicit rejection on the path; it is not proof of DNS failure. A timeout is consistent with several causes, including filtering, an unreachable return path or a stalled service. Report those as hypotheses rather than facts. Acceptance requires parseable JSON, separate resolution and transport timings, visible status evidence in HTTP mode, and nonzero exit status when no candidate completes the requested probe. Extend the report manually with ip route get and ss only on systems that provide them; this portable script does not pretend to infer the routing table from a socket error.',ta:'Local HTTP server தொடங்கி connection வெற்றி, status line இரண்டையும் பெறுங்கள். பின்னர் server-ஐ நிறுத்தி அதே command-ஐ மீண்டும் இயக்குங்கள். Refusal பொதுவாக listener இல்லாததையோ பாதையில் வெளிப்படையான rejection இருப்பதையோ குறிக்கலாம்; DNS failure-க்கு அது சான்றல்ல. Timeout-க்கு filtering, திரும்பும் பாதை அணுகமுடியாமை, செயலற்ற service போன்ற பல காரணங்கள் இருக்கலாம். அவற்றை உண்மை என்று அல்ல, சாத்தியமான காரணங்களாகக் குறிப்பிடுங்கள். Parse செய்யக்கூடிய JSON, தனித்த resolution மற்றும் transport நேரங்கள், HTTP mode-ல் status சான்று, எந்த candidate-மும் கேட்ட probe-ஐ முடிக்காவிட்டால் nonzero exit status ஆகியவை acceptance நிபந்தனைகள். கிடைக்கும் system-களில் ip route get, ss மூலம் அறிக்கையை விரிவாக்கலாம்; socket error மட்டும் வைத்து routing table-ஐ இந்த portable script ஊகிப்பதில்லை.'}}
    ],
    example:{en:'Resolution takes 1 ms, TCP connect takes 0.4 ms and HEAD returns HTTP/1.0 200 OK. This supports three distinct observations. If the next run resolves identically but connect is refused, investigate listener state first rather than changing DNS servers.',ta:'Resolution 1 ms, TCP connect 0.4 ms எடுத்து HEAD HTTP/1.0 200 OK தந்தால் மூன்று தனித்த observations கிடைத்துள்ளன. அடுத்த run-ல் அதே resolution இருந்தும் connect மறுக்கப்பட்டால் DNS server மாற்றுவதற்கு முன் listener நிலையை ஆராயுங்கள்.'},
    failure:{en:'A TCP connection succeeds but the response read times out. Transport setup worked; the application probe did not finish. Confirm protocol and port, then inspect the authorized server. Increasing the timeout alone does not explain the failure.',ta:'TCP connection வென்றும் response read timeout அடைந்தால் transport setup நடந்துள்ளது; application probe முடிவடையவில்லை. Protocol, port சரியா என்று பார்த்து அனுமதியுள்ள server-ஐ ஆய்வு செய்யுங்கள். Timeout அதிகரிப்பது மட்டும் தோல்வியை விளக்காது.'},
    lab:{commands:'python3 -m http.server 8052 --bind 127.0.0.1\n# Terminal 2 / இரண்டாவது terminal\npython3 diagnose.py 127.0.0.1 8052 --http\n# Stop HTTP server with Ctrl+C, then repeat.\n# Ctrl+C மூலம் HTTP server நிறுத்தி மீண்டும் இயக்கவும்.\npython3 diagnose.py 127.0.0.1 8052 --http',guidance:{en:'Download diagnose.py and run the HTTP server from an empty directory. Do not scan address ranges; the CLI tests only the explicit endpoint supplied. Compare the successful and stopped-server reports.',ta:'diagnose.py-ஐப் பதிவிறக்கி காலியான directory-ல் HTTP server இயக்குங்கள். Address range-களை scan செய்ய வேண்டாம்; கொடுக்கப்பட்ட ஒரே endpoint-ஐ CLI சோதிக்கிறது. வெற்றிகரமான report-ஐயும் server நிறுத்தியபிறகான report-ஐயும் ஒப்பிடுங்கள்.'},expected:{en:'While the server runs, JSON shows resolve, connect and HTTP status stages with exit code zero. After stopping it, resolution still works and connect normally reports ConnectionRefusedError with exit code one.',ta:'Server ஓடும்போது JSON resolve, connect, HTTP status கட்டங்களைக் காட்டி exit code zero தரும். நிறுத்தியபின் resolution இன்னும் வேலை செய்யும்; connect பொதுவாக ConnectionRefusedError காட்டி exit code one தரும்.'},cleanup:{en:'Ctrl+C stops the HTTP server. The diagnostic program exits itself and creates no files or network configuration.',ta:'Ctrl+C HTTP server-ஐ நிறுத்தும். Diagnostic program தானாக வெளியேறும்; file அல்லது network configuration உருவாக்காது.'}},
    questions:[
      {question:{en:'Resolution succeeds but connect is refused. What is a useful next observation?',ta:'Resolution வெற்றி, connect மறுப்பு எனில் அடுத்து பயனுள்ள observation எது?'},options:{en:['Check whether the intended service is listening','Flush all DNS records immediately','Assume the remote disk is full'],ta:['தேவையான service கேட்கிறதா என்று பார்க்கவும்','உடனே எல்லா DNS record-களையும் அழிக்கவும்','Remote disk நிரம்பிவிட்டதாகக் கருதவும்']},answer:0,explanation:{en:'Listener evidence directly tests a plausible cause of refusal.',ta:'Listener சான்று refusal-க்கு சாத்தியமான காரணத்தை நேரடியாகச் சோதிக்கிறது.'}},
      {question:{en:'Three candidates each time out after two seconds. Is total runtime bounded by two seconds?',ta:'மூன்று candidate-களும் தலா இரண்டு விநாடியில் timeout ஆனால் மொத்த நேரம் இரண்டு விநாடிக்குள் முடியுமா?'},options:{en:['No; sequential attempts alone can take about six seconds','Yes; all candidates share one implicit timer','Yes; DNS removes socket timeouts'],ta:['இல்லை; வரிசையான முயற்சிகளே சுமார் ஆறு விநாடி எடுக்கலாம்','ஆம்; எல்லாவற்றுக்கும் ஒரே மறைமுக timer உண்டு','ஆம்; DNS socket timeout-ஐ நீக்கும்']},answer:0,explanation:{en:'Each socket operation has its own timeout; resolution adds separate time.',ta:'ஒவ்வொரு socket operation-க்கும் தனி timeout உண்டு; resolution நேரம் கூடுதலாகச் சேரும்.'}},
      {question:{en:'Does a successful TCP connect establish HTTP correctness?',ta:'TCP connect வெற்றி HTTP சரியாக வேலை செய்வதை நிரூபிக்குமா?'},options:{en:['No; inspect the application response separately','Yes; every TCP port uses HTTP','Yes; DNS validates HTTP'],ta:['இல்லை; application response-ஐ தனியே பார்க்க வேண்டும்','ஆம்; எல்லா TCP port-களும் HTTP பயன்படுத்தும்','ஆம்; DNS HTTP-ஐச் சரிபார்க்கும்']},answer:0,explanation:{en:'Transport establishment and application behavior are different stages.',ta:'Transport இணைப்பு அமைதலும் application நடத்தையும் வெவ்வேறு கட்டங்கள்.'}}
    ],
    refs:[['Python socket API','https://docs.python.org/3/library/socket.html'],['HTTP semantics','https://www.rfc-editor.org/rfc/rfc9110.html']],
    files:[{name:'diagnose.py',content:String.raw`import argparse, json, socket, sys, time

def emit(stage, start, **fields):
    print(json.dumps(dict(stage=stage, ms=round((time.perf_counter()-start)*1000, 3), **fields)))

def main():
    p = argparse.ArgumentParser()
    p.add_argument("host", nargs="?", default="127.0.0.1")
    p.add_argument("port", nargs="?", type=int, default=8052)
    p.add_argument("--http", action="store_true"); a = p.parse_args()
    if not 1 <= a.port <= 65535: p.error("port / port வரம்பு: 1..65535")
    if any(ord(c) < 33 or ord(c) > 126 for c in a.host):
        p.error("ASCII host without whitespace / இடைவெளி இல்லாத ASCII host தேவை")
    start = time.perf_counter()
    try:
        candidates = socket.getaddrinfo(a.host, a.port, socket.AF_UNSPEC, socket.SOCK_STREAM)
    except OSError as e:
        emit("resolve", start, ok=False, error=type(e).__name__, detail=str(e)); return 1
    emit("resolve", start, ok=True, candidates=len(candidates))
    seen = set(); successes = 0
    for family, kind, proto, _, address in candidates:
        key = (family, address)
        if key in seen: continue
        seen.add(key); start = time.perf_counter(); stage = "connect"
        try:
            with socket.socket(family, kind, proto) as s:
                s.settimeout(2); s.connect(address)
                emit(stage, start, ok=True, family=family, address=address)
                if a.http:
                    stage = "http"; start = time.perf_counter()
                    host = "["+a.host+"]" if ":" in a.host else a.host
                    request = "HEAD / HTTP/1.0\r\nHost: " + host + ":" + str(a.port) + "\r\n\r\n"
                    s.sendall(request.encode("ascii")); line = bytearray()
                    while not line.endswith(b"\r\n") and len(line) < 1024:
                        b = s.recv(1)
                        if not b: raise EOFError("status line incomplete")
                        line.extend(b)
                    text = line.decode("ascii", "replace").strip()
                    fields = text.split()
                    if not line.endswith(b"\r\n") or len(fields) < 2 or not fields[0].startswith("HTTP/") or not (len(fields[1]) == 3 and fields[1].isdigit()):
                        raise ValueError("invalid HTTP status line")
                    emit(stage, start, ok=True, address=address, status=text)
                successes += 1
        except (OSError, EOFError, ValueError) as e:
            emit(stage, start, ok=False, address=address, error=type(e).__name__, detail=str(e))
    return 0 if successes else 1

if __name__ == "__main__":
    sys.exit(main())
` }]
  },
  {
    id:53,module:11,model:'firewall',
    title:{en:'Two-router namespace and firewall capstone',ta:'இரண்டு router namespace மற்றும் firewall ஒருங்கிணைப்புத் திட்டம்'},
    summary:{en:'Create an isolated four-namespace path, route both directions and prove a stateful forwarding policy with positive and negative tests.',ta:'தனிமைப்படுத்தப்பட்ட நான்கு namespace பாதையை உருவாக்கி இரு திசைகளிலும் routing அமைத்து, அனுமதி மற்றும் மறுப்பு சோதனைகளால் stateful forwarding கொள்கையை நிரூபியுங்கள்.'},
    prerequisites:{en:'A disposable Linux VM with root, iproute2, nftables, ping, sysctl and Python 3. No physical interfaces or host firewall rules are changed. This lab cannot run on a stock Windows or macOS kernel.',ta:'Root அனுமதி, iproute2, nftables, ping, sysctl, Python 3 கொண்ட சோதனை Linux VM தேவை. Physical interface அல்லது host firewall விதிகள் மாற்றப்படாது. சாதாரண Windows அல்லது macOS kernel-ல் இந்த lab இயங்காது.'},
    objectives:{en:['Build A–R1–R2–B with three disjoint /30 links.','Install forward and return routes without NAT.','Verify permitted HTTP, denied new ICMP and recovery from a missing return route.'],ta:['மூன்று தனித்த /30 link-களுடன் A–R1–R2–B அமைத்தல்.','NAT இன்றி செல்லும், திரும்பும் route-களை நிறுவுதல்.','அனுமதிக்கப்பட்ட HTTP, மறுக்கப்பட்ட புதிய ICMP, இல்லாத return route-இலிருந்து மீட்பு ஆகியவற்றைச் சோதித்தல்.']},
    sections:[
      {heading:{en:'Milestone 1: build a path you can explain',ta:'கட்டம் 1: விளக்கக்கூடிய பாதையை உருவாக்குதல்'},body:{en:'Use four network namespaces named p53a, p53r1, p53r2 and p53b. The A–R1 link is 10.253.1.0/30, R1–R2 is 10.253.2.0/30 and R2–B is 10.253.3.0/30. Assign the lower usable address to the left endpoint and the upper one to the right. A defaults through R1; B defaults through R2. R1 needs a route to B’s subnet through R2, and R2 needs a route to A’s subnet through R1. Enable IPv4 forwarding only inside the two router namespaces. There is no host uplink, bridge or NAT; packets remain within the virtual topology. Refuse setup if any lab namespace already exists so an unrelated experiment is not adopted or deleted.',ta:'p53a, p53r1, p53r2, p53b என்ற நான்கு network namespace-களைப் பயன்படுத்துங்கள். A–R1 link 10.253.1.0/30, R1–R2 link 10.253.2.0/30, R2–B link 10.253.3.0/30. பயன்படுத்தக்கூடிய சிறிய address இடது முனைக்கும் பெரியது வலது முனைக்கும் வழங்கப்படுகிறது. A-வின் default R1 வழியாகவும் B-யின் default R2 வழியாகவும் செல்கிறது. R1-க்கு B subnet நோக்கி R2 வழியான route தேவை; R2-க்கு A subnet நோக்கி R1 வழியான route தேவை. இரண்டு router namespace-களுக்குள் மட்டும் IPv4 forwarding செயல்படுத்துங்கள். Host uplink, bridge, NAT எதுவும் இல்லை; packet-கள் virtual topology-க்குள் இருக்கும். Lab namespace ஒன்று முன்பே இருந்தாலும் setup மறுக்க வேண்டும்; தொடர்பில்லாத சோதனையை ஏற்றுக்கொண்டு அழிக்கக் கூடாது.'}},
      {heading:{en:'Milestone 2: install a narrow forwarding policy',ta:'கட்டம் 2: குறுகிய forwarding கொள்கை அமைத்தல்'},body:{en:'First test end-to-end ping with routing alone. Then apply an nftables forward chain in R1 with default drop, established/related acceptance and a single new-flow allowance: A to B TCP destination port 8053. The policy acts on forwarded traffic, not traffic addressed to R1 itself. Conntrack permits return traffic for the accepted HTTP connection. New ICMP echo attempts from A to B now fail; do not use that failure as evidence that all routing is broken. Inspect counters for the explicit accept and final drop rules. The HTTP listener binds specifically to B’s isolated 10.253.3.2 address, which is intentionally reachable through this lab rather than through a physical LAN.',ta:'முதலில் routing மட்டும் இருக்கும்போது முனையிலிருந்து முனைக்கு ping சோதியுங்கள். பின்னர் R1-ல் nftables forward chain அமைத்து default drop, established/related அனுமதி, ஒரே புதிய flow அனுமதி ஆகியவற்றைச் சேர்க்குங்கள்: A-இலிருந்து B-க்கு TCP destination port 8053. இந்தக் கொள்கை forward ஆகும் traffic-ஐக் கட்டுப்படுத்தும்; R1-க்கே அனுப்பிய traffic-ஐ அல்ல. அனுமதிக்கப்பட்ட HTTP connection-ன் return traffic-ஐ conntrack அனுமதிக்கும். A-இலிருந்து B-க்கு புதிய ICMP echo இப்போது தோல்வியடையும்; routing முழுவதும் பழுதானதற்கான சான்றாக அதை எடுத்துக்கொள்ள வேண்டாம். Explicit accept, இறுதி drop விதிகளின் counter-களைப் பாருங்கள். HTTP listener B-யின் தனிமைப்படுத்தப்பட்ட 10.253.3.2 address-ல் குறிப்பாக bind செய்கிறது; physical LAN வழியாக அல்ல, இந்த lab வழியாக அணுகும் நோக்கம் கொண்டது.'}},
      {heading:{en:'Milestone 3: break one direction and recover',ta:'கட்டம் 3: ஒரு திசையைத் துண்டித்து மீட்டல்'},body:{en:'After HTTP succeeds and ping is denied, delete only R2’s route to A’s subnet using the break action. A new HTTP request should time out even though R1 still allows the forward SYN. Inspect both route tables and explain why a forward route is insufficient for a bidirectional TCP handshake. The repair action restores exactly that route; repeat the original HTTP request and confirm recovery. Acceptance evidence includes the address plan, pre-policy ping success, post-policy HTTP success, post-policy ping failure, drop counters, broken-return failure and repaired success. Stop the namespaced HTTP process before cleanup because a live process can keep a deleted namespace alive. The cleanup action refuses deletion when namespaced processes remain. Run cleanup only for resources created by this exercise.',ta:'HTTP வென்றும் ping மறுக்கப்பட்டும் பிறகு break action மூலம் R2-ன் A subnet route மட்டும் நீக்குங்கள். R1 செல்லும் SYN-ஐ இன்னும் அனுமதித்தாலும் புதிய HTTP request timeout அடைய வேண்டும். இரு route table-களையும் பார்த்து, இருதிசை TCP handshake-க்கு செல்லும் route மட்டும் ஏன் போதாது என்று விளக்குங்கள். Repair action அந்த route-ஐ மட்டும் மீண்டும் சேர்க்கும்; அசல் HTTP request மீண்டும் செய்து மீட்சியை உறுதிசெய்யுங்கள். Address plan, கொள்கைக்கு முந்தைய ping வெற்றி, கொள்கைக்குப் பிந்தைய HTTP வெற்றி, ping தோல்வி, drop counter, return பாதை துண்டித்த தோல்வி, சரிசெய்த வெற்றி ஆகியவை acceptance சான்றுகள். Cleanup-க்கு முன் namespaced HTTP process-ஐ நிறுத்துங்கள்; உயிருடன் இருக்கும் process நீக்கிய namespace-ஐத் தொடரச் செய்யலாம். Process இருந்தால் cleanup நீக்க மறுக்கும். இந்தப் பயிற்சி உருவாக்கிய resource-களுக்கு மட்டும் cleanup இயக்குங்கள்.'}}
    ],
    example:{en:'A sends 10.253.1.1 → 10.253.3.2:8053 through next hop 10.253.1.2. R1 forwards through 10.253.2.2. B replies through 10.253.3.1; R2 must then use 10.253.2.1 for 10.253.1.0/30. No address translation is needed.',ta:'A, 10.253.1.1 → 10.253.3.2:8053 traffic-ஐ next hop 10.253.1.2 வழியாக அனுப்புகிறது. R1, 10.253.2.2 வழியாக forward செய்கிறது. B, 10.253.3.1 வழியாகப் பதிலளிக்கிறது; பின்னர் R2, 10.253.1.0/30-க்கு 10.253.2.1 பயன்படுத்த வேண்டும். Address translation தேவையில்லை.'},
    failure:{en:'Ping fails after policy installation while HTTP succeeds. This is the intended negative test. A separate HTTP timeout after break indicates the removed return route; changing the firewall would obscure rather than repair that cause.',ta:'கொள்கை அமைத்தபின் HTTP வென்றும் ping தோல்வியடைந்தால் அது திட்டமிட்ட negative test. Break-க்குப் பிறகான தனி HTTP timeout நீக்கிய return route-ஐக் குறிக்கிறது; firewall மாற்றுவது காரணத்தைச் சரிசெய்யாமல் மறைக்கும்.'},
    lab:{commands:'sudo python3 topology.py setup\nsudo ip netns exec p53a ping -c 2 -W 1 10.253.3.2\nsudo python3 topology.py policy\nsudo ip netns exec p53b python3 -m http.server 8053 --bind 10.253.3.2 --directory /tmp\n# Terminal 2 / இரண்டாவது terminal\nsudo ip netns exec p53a python3 -c "import urllib.request; print(urllib.request.urlopen(\'http://10.253.3.2:8053/\', timeout=3).status)"\nsudo ip netns exec p53a ping -c 2 -W 1 10.253.3.2\nsudo ip netns exec p53r1 nft list ruleset\nsudo python3 topology.py break\nsudo ip netns exec p53a python3 -c "import urllib.request; urllib.request.urlopen(\'http://10.253.3.2:8053/\', timeout=3)"\nsudo python3 topology.py repair\nsudo ip netns exec p53a python3 -c "import urllib.request; print(urllib.request.urlopen(\'http://10.253.3.2:8053/\', timeout=3).status)"\n# Stop server with Ctrl+C first / முதலில் Ctrl+C மூலம் server நிறுத்தவும்\nsudo python3 topology.py cleanup',guidance:{en:'Download topology.py. Use a disposable Linux VM and an empty temporary serving directory instead of /tmp if /tmp contains sensitive filenames. Setup rolls back namespaces it created on failure; if required capabilities are unavailable, stop and report that limitation.',ta:'topology.py-ஐப் பதிவிறக்குங்கள். சோதனை Linux VM பயன்படுத்துங்கள்; /tmp-ல் தனிப்பட்ட filename இருந்தால் அதற்குப் பதில் காலியான temporary serving directory பயன்படுத்துங்கள். Setup தோல்வியில் தான் உருவாக்கிய namespace-களை மீட்கும்; தேவையான capability இல்லாவிட்டால் நிறுத்தி அந்த வரம்பைப் பதிவு செய்யுங்கள்.'},expected:{en:'Before policy: ping replies. After policy: HTTP 200, new ping loss and drop counters. Break: HTTP timeout. Repair: HTTP 200 again. Cleanup leaves none of the four p53 namespaces.',ta:'கொள்கைக்கு முன் ping பதில் வரும். பிறகு HTTP 200, புதிய ping loss, drop counter காணப்படும். Break-ல் HTTP timeout; repair-ல் மீண்டும் HTTP 200. Cleanup-க்குப் பிறகு நான்கு p53 namespace-களும் இருக்காது.'},cleanup:{en:'Ctrl+C the HTTP server, then run sudo python3 topology.py cleanup. Never flush the host ruleset or delete unrelated namespaces.',ta:'HTTP server-ஐ Ctrl+C மூலம் நிறுத்தி sudo python3 topology.py cleanup இயக்குங்கள். Host ruleset-ஐ flush செய்யவோ தொடர்பில்லாத namespace-களை நீக்கவோ வேண்டாம்.'}},
    questions:[
      {question:{en:'Why can HTTP succeed while ping fails after policy?',ta:'கொள்கைக்குப் பிறகு HTTP வென்றும் ping ஏன் தோல்வியடையலாம்?'},options:{en:['The policy permits TCP 8053 but drops new ICMP','HTTP does not use IP','Ping requires NAT'],ta:['கொள்கை TCP 8053-ஐ அனுமதித்து புதிய ICMP-ஐ drop செய்கிறது','HTTP IP பயன்படுத்தாது','Ping-க்கு NAT தேவை']},answer:0,explanation:{en:'Different protocols can have different forwarding permissions.',ta:'வெவ்வேறு protocol-களுக்கு வெவ்வேறு forwarding அனுமதி இருக்கலாம்.'}},
      {question:{en:'Which next hop restores R2’s path to 10.253.1.0/30?',ta:'10.253.1.0/30 நோக்கிய R2 பாதைக்கு எந்த next hop தேவை?'},options:{en:['10.253.2.1','10.253.3.2','127.0.0.1'],ta:['10.253.2.1','10.253.3.2','127.0.0.1']},answer:0,explanation:{en:'R1’s address on the R1–R2 link is 10.253.2.1.',ta:'R1–R2 link-ல் R1-ன் address 10.253.2.1.'}},
      {question:{en:'Why stop namespace processes before deletion?',ta:'Namespace நீக்குமுன் அதன் process-களை ஏன் நிறுத்த வேண்டும்?'},options:{en:['Their references can keep the namespace alive','They automatically change host DNS','Nftables requires an Internet connection'],ta:['அவற்றின் reference namespace-ஐ உயிருடன் வைத்திருக்கலாம்','அவை தானாக host DNS மாற்றும்','Nftables-க்கு Internet தேவை']},answer:0,explanation:{en:'Removing a name is not the same as releasing every reference.',ta:'பெயரை நீக்குவது எல்லா reference-களையும் விடுவிப்பதற்குச் சமமல்ல.'}}
    ],
    refs:[['ip-netns manual','https://man7.org/linux/man-pages/man8/ip-netns.8.html'],['nftables project manual','https://netfilter.org/projects/nftables/manpage.html']],
    files:[{name:'topology.py',content:String.raw`import json, subprocess, sys

NAMES = ["p53a", "p53r1", "p53r2", "p53b"]
def run(*args, **kw):
    return subprocess.run(args, check=True, text=True, **kw)
def inside(ns, *args, **kw):
    return run("ip", "netns", "exec", ns, *args, **kw)
def existing():
    output = run("ip", "-j", "netns", "list", capture_output=True).stdout.strip()
    return {n["name"] for n in json.loads(output or "[]")}
def setup():
    if existing().intersection(NAMES): raise RuntimeError("names occupied / பெயர்கள் பயன்பாட்டில் உள்ளன")
    created = []
    try:
        for ns in NAMES:
            run("ip", "netns", "add", ns); created.append(ns)
            run("ip", "-n", ns, "link", "set", "lo", "up")
        for i, (left, right) in enumerate(zip(NAMES, NAMES[1:]), 1):
            x, y = "l"+str(i), "r"+str(i)
            inside(left, "ip", "link", "add", x, "type", "veth", "peer", "name", y)
            inside(left, "ip", "link", "set", y, "netns", right)
            for ns, dev, host in [(left,x,1),(right,y,2)]:
                run("ip", "-n", ns, "addr", "add", "10.253.%d.%d/30"%(i,host), "dev", dev)
                run("ip", "-n", ns, "link", "set", dev, "up")
        for ns in NAMES[1:3]: inside(ns,"sysctl","-qw","net.ipv4.ip_forward=1")
        for ns, dest, gateway in [("p53a","default","10.253.1.2"),
                                  ("p53b","default","10.253.3.1"),
                                  ("p53r1","10.253.3.0/30","10.253.2.2"),
                                  ("p53r2","10.253.1.0/30","10.253.2.1")]:
            run("ip","-n",ns,"route","add",dest,"via",gateway)
    except BaseException:
        for ns in reversed(created):
            subprocess.run(["ip","netns","del",ns], check=False)
        raise
def main():
    mode = sys.argv[1]
    if mode == "setup": setup(); return
    if mode == "cleanup":
        present = existing().intersection(NAMES)
        for ns in present:
            if run("ip","netns","pids",ns,capture_output=True).stdout.strip():
                raise RuntimeError("stop namespace processes first / முதலில் process-களை நிறுத்தவும்")
        for ns in reversed(NAMES):
            if ns in present: run("ip","netns","del",ns)
        return
    if not set(NAMES).issubset(existing()): raise RuntimeError("run setup first")
    if mode == "policy":
        rules = """table inet p53 {
 chain forward {
  type filter hook forward priority 0; policy drop;
  ct state established,related counter accept
  ip saddr 10.253.1.1 ip daddr 10.253.3.2 tcp dport 8053 ct state new counter accept
  counter drop
 }
}
"""
        inside("p53r1","nft","-f","-",input=rules)
    elif mode == "break":
        run("ip","-n","p53r2","route","del","10.253.1.0/30")
    elif mode == "repair":
        run("ip","-n","p53r2","route","replace","10.253.1.0/30","via","10.253.2.1")
    else: raise ValueError("setup | policy | break | repair | cleanup")

if __name__ == "__main__": main()
` }]
  },
  {
    id:54,module:11,model:'research',
    title:{en:'Reproducible TCP benchmark research capstone',ta:'மீண்டும் உருவாக்கக்கூடிய TCP benchmark ஆய்வுத் திட்டம்'},
    summary:{en:'Test a narrow batching hypothesis with a loopback echo workload, randomized paired trials, integrity checks and a bounded interpretation.',ta:'Loopback echo workload, சீரற்ற வரிசையில் இணை trial-கள், integrity check, வரம்புள்ள விளக்கம் ஆகியவற்றால் batching பற்றிய குறிப்பிட்ட கருதுகோளைச் சோதியுங்கள்.'},
    prerequisites:{en:'Python 3.9+, basic statistics, timing units and the difference between application goodput and link capacity. No paid service, packet capture or administrator access is needed.',ta:'Python 3.9+, அடிப்படை புள்ளியியல், நேர அலகுகள், application goodput மற்றும் link capacity வேறுபாடு பற்றிய அறிவு தேவை. கட்டண service, packet capture, administrator அணுகல் தேவையில்லை.'},
    objectives:{en:['State a falsifiable hypothesis about application write size.','Run randomized paired trials with excluded warmups and checked payloads.','Report raw measurements, medians, spread, confounders and limits.'],ta:['Application write size பற்றிய மறுக்கக்கூடிய கருதுகோளை வரையறுத்தல்.','Warmup-ஐத் தவிர்த்து payload சரிபார்ப்புடன் சீரற்ற இணை trial-களை இயக்குதல்.','Raw measurement, median, பரவல், confounder, வரம்புகளை அறிக்கையிடுதல்.']},
    sections:[
      {heading:{en:'Milestone 1: preregister a narrow question',ta:'கட்டம் 1: குறுகிய ஆய்வுக் கேள்வியை முன்பதிவு செய்தல்'},body:{en:'Ask whether writing a fixed 262,144-byte payload in 65,536-byte batches changes median application echo goodput compared with 1024-byte batches on this machine. Predict a direction before running the program, but allow a null or opposite result. The independent variable is the client write batch; hold total payload, connection count, server receive size and endpoint constant. Both modes use one fresh TCP connection per trial, with connection setup excluded from the timed interval. This benchmark is a closed-loop request/echo workload, not a raw link-capacity measurement or an RFC 2544 device benchmark. Its result cannot establish Internet performance, congestion-control superiority or production readiness.',ta:'இதே கணினியில் நிர்ணயிக்கப்பட்ட 262,144-byte payload-ஐ 1024-byte batch-களுக்கு பதில் 65,536-byte batch-களாக எழுதினால் median application echo goodput மாறுகிறதா என்று கேளுங்கள். இயக்குமுன் முடிவின் திசையை முன்கணியுங்கள்; மாற்றமில்லாத அல்லது எதிரான முடிவையும் ஏற்க வேண்டும். Independent variable client write batch. மொத்த payload, connection எண்ணிக்கை, server receive அளவு, endpoint ஆகியவற்றை மாறாமல் வைத்திருங்கள். இரு mode-களும் trial ஒன்றுக்கு புதிய TCP connection பயன்படுத்துகின்றன; connection setup timed interval-ல் சேராது. இது closed-loop request/echo workload; raw link-capacity அளவீடோ RFC 2544 device benchmark-ஓ அல்ல. இதன் முடிவு Internet செயல்திறன், congestion-control மேன்மை அல்லது production தயார்நிலையை நிரூபிக்காது.'}},
      {heading:{en:'Milestone 2: generate trustworthy observations',ta:'கட்டம் 2: நம்பத்தகுந்த observation உருவாக்குதல்'},body:{en:'The included program starts a server on an ephemeral loopback port, performs two excluded warmups per batch size and runs ten randomized pairs using a recorded seed. Within each batch, the client sends bytes and receives the complete echo before advancing, so batch size also changes the number of application waits. Describe that mechanism rather than claiming a pure send-system-call experiment. The receiver checks every echoed byte before accepting a trial. A monotonic high-resolution clock spans payload transfer, echo reception and validation. Useful bytes in the numerator count the original payload once, even though the workload carries traffic in both directions. Emit JSON lines with environment, trial order, seconds, batch size and decimal MB/s; retain failed runs as evidence rather than quietly deleting them.',ta:'வழங்கப்பட்ட program ephemeral loopback port-ல் server தொடங்கி, ஒவ்வொரு batch அளவுக்கும் கணக்கில் சேராத இரண்டு warmup செய்து, பதிவு செய்யப்பட்ட seed மூலம் சீரற்ற வரிசையில் பத்து இணை trial-களை இயக்குகிறது. ஒவ்வொரு batch-லும் client byte-களை அனுப்பி முழு echo பெற்றபிறகே அடுத்ததைத் தொடங்கும்; ஆகவே batch size application காத்திருப்புகளின் எண்ணிக்கையையும் மாற்றுகிறது. இதை விளக்குங்கள்; send system call மட்டும் மாறும் சோதனை என்று கூற வேண்டாம். Trial ஏற்குமுன் ஒவ்வொரு echoed byte-மும் சரிபார்க்கப்படுகிறது. Payload பரிமாற்றம், echo பெறுதல், validation ஆகியவற்றை monotonic உயர் துல்லிய clock அளவிடுகிறது. இருதிசையிலும் traffic இருந்தாலும் numerator-ல் அசல் payload ஒருமுறை மட்டுமே எண்ணப்படுகிறது. Environment, trial வரிசை, seconds, batch size, decimal MB/s கொண்ட JSON line-களை வெளியிடுங்கள்; தோல்வி run-களை அமைதியாக நீக்காமல் சான்றாக வைத்திருங்கள்.'}},
      {heading:{en:'Milestone 3: explain uncertainty and reproduce',ta:'கட்டம் 3: நிச்சயமின்மையை விளக்கி மீண்டும் சோதித்தல்'},body:{en:'Acceptance requires twenty measured rows, successful integrity checks, a recorded seed, both per-mode medians and minimum/maximum values, and a second complete run saved separately. Compare paired observations as well as summary values. A single fast trial is not a stable conclusion. Identify confounders such as CPU scheduling, frequency changes, background work, Python interpreter overhead and memory copying. Loopback avoids physical loss and radio contention, so explicitly limit the claim to this setup. Do not invent confidence intervals from too few dependent samples. Deliver a brief report containing hypothesis, exact command, environment, raw results, summary calculation, contradictory observations and one justified next experiment. Suggested next work is to repeat on an authorized isolated LAN with encrypted transport and documented hardware; changing the path would require a new experimental description.',ta:'இருபது measured row-கள், வெற்றிகரமான integrity check-கள், பதிவு செய்யப்பட்ட seed, இரு mode-களின் median மற்றும் minimum/maximum, தனியாகச் சேமித்த இரண்டாவது முழு run ஆகியவை acceptance நிபந்தனைகள். Summary மட்டுமல்லாமல் இணை observation-களையும் ஒப்பிடுங்கள். ஒரே வேகமான trial நிலையான முடிவல்ல. CPU scheduling, frequency மாற்றம், பின்னணி வேலை, Python interpreter செலவு, memory copy போன்ற confounder-களை அடையாளம் காணுங்கள். Loopback physical loss, radio contention ஆகியவற்றைத் தவிர்க்கிறது; ஆகவே முடிவை இந்த அமைப்பிற்குள் மட்டும் வரம்பிடுங்கள். சார்புள்ள சில sample-களிலிருந்து ஆதாரமற்ற confidence interval உருவாக்க வேண்டாம். Hypothesis, exact command, environment, raw result, summary கணக்கீடு, முரண்பட்ட observation, நியாயமான அடுத்த சோதனை ஆகியவற்றுடன் சுருக்க அறிக்கை தருங்கள். அடுத்ததாக அனுமதியுள்ள தனிமைப்படுத்தப்பட்ட LAN-ல் encrypted transport, பதிவுசெய்த hardware உடன் மீண்டும் சோதிக்கலாம்; பாதை மாறினால் புதிய experimental description தேவை.'}}
    ],
    example:{en:'If 262,144 useful bytes complete in 0.008 seconds, goodput is 32.768 decimal MB/s or 262.144 Mbit/s. Counting echoed bytes again would double the numerator and describe a different metric. A faster large-batch result can reflect fewer application round trips as well as fewer calls.',ta:'262,144 பயனுள்ள byte-கள் 0.008 விநாடியில் முடிந்தால் goodput 32.768 decimal MB/s அல்லது 262.144 Mbit/s. Echo byte-களை மீண்டும் எண்ணினால் numerator இரட்டிப்பாகி வேறு metric ஆகும். பெரிய batch வேகமாக இருப்பது குறைந்த call எண்ணிக்கையுடன் குறைந்த application round trip எண்ணிக்கையையும் பிரதிபலிக்கலாம்.'},
    failure:{en:'A server error or short echo invalidates that trial; the program raises instead of reporting a misleading throughput. If one run is much slower, inspect environment and order before discarding it. Repeating until a preferred result appears is selection bias.',ta:'Server பிழை அல்லது குறைந்த echo அந்த trial-ஐ செல்லாததாக்கும்; தவறான throughput காட்டாமல் program exception எழுப்பும். ஒரு run மிகவும் மெதுவாக இருந்தால் நீக்குமுன் environment, வரிசையைப் பாருங்கள். விரும்பிய முடிவு வரும் வரை மீண்டும் செய்வது selection bias.'},
    lab:{commands:'python3 benchmark.py --seed 54 > run54-a.jsonl\npython3 benchmark.py --seed 54 > run54-b.jsonl\npython3 benchmark.py --summarize run54-a.jsonl\npython3 benchmark.py --summarize run54-b.jsonl',guidance:{en:'Download benchmark.py. Run with other deliberate workloads stopped, recording that choice. Keep both raw outputs and explain differences. The script owns its ephemeral server and closes it in a finally block.',ta:'benchmark.py-ஐப் பதிவிறக்குங்கள். மற்ற திட்டமிட்ட workload-களை நிறுத்தி அந்தத் தேர்வைப் பதிவு செய்து இயக்குங்கள். இரண்டு raw output-களையும் வைத்திருந்து வேறுபாட்டை விளக்குங்கள். Script தனது ephemeral server-ஐ நிர்வகித்து finally block-ல் மூடுகிறது.'},expected:{en:'Each file contains one environment row and twenty trial rows. Summary prints n=10 for each batch with median, minimum and maximum MB/s. No particular speed ranking is required to pass.',ta:'ஒவ்வொரு file-லும் ஒரு environment row, இருபது trial row-கள் இருக்கும். Summary ஒவ்வொரு batch-க்கும் n=10 மற்றும் median, minimum, maximum MB/s காட்டும். குறிப்பிட்ட வேக வரிசை இருந்தால்தான் தேர்ச்சி என்ற நிபந்தனை இல்லை.'},cleanup:{en:'The program stops its server automatically; Ctrl+C also enters cleanup. Delete only run54-a.jsonl and run54-b.jsonl after preserving any desired report evidence.',ta:'Program server-ஐ தானாக நிறுத்தும்; Ctrl+C-யும் cleanup செய்யும். தேவையான அறிக்கைச் சான்றைப் பாதுகாத்தபின் run54-a.jsonl, run54-b.jsonl மட்டும் நீக்குங்கள்.'}},
    questions:[
      {question:{en:'262,144 bytes in 0.008 seconds equals which decimal goodput?',ta:'262,144 byte-கள் 0.008 விநாடியில் முடிந்தால் decimal goodput என்ன?'},options:{en:['32.768 MB/s','262.144 MB/s','0.032768 MB/s'],ta:['32.768 MB/s','262.144 MB/s','0.032768 MB/s']},answer:0,explanation:{en:'Divide bytes by seconds and then by one million.',ta:'Byte எண்ணிக்கையை விநாடிகளாலும் பின்னர் பத்து லட்சத்தாலும் வகுக்க வேண்டும்.'}},
      {question:{en:'Why randomize order within pairs?',ta:'இணை trial-களுக்குள் வரிசையை ஏன் சீரற்றதாக்க வேண்டும்?'},options:{en:['Reduce systematic order confounding','Guarantee statistical independence','Guarantee the larger batch wins'],ta:['வரிசையால் வரும் முறையான confounding-ஐக் குறைக்க','Statistical independence உறுதிசெய்ய','பெரிய batch வெல்வதை உறுதிசெய்ய']},answer:0,explanation:{en:'Random order helps distribute time-dependent effects but does not eliminate dependence.',ta:'சீரற்ற வரிசை நேரத்துடன் மாறும் விளைவுகளைப் பகிர உதவும்; சார்பை முழுவதும் நீக்காது.'}},
      {question:{en:'What can this loopback experiment support?',ta:'இந்த loopback சோதனை எந்த முடிவை ஆதரிக்கலாம்?'},options:{en:['A bounded claim about this application workload on this host','All Internet links have this bandwidth','One TCP congestion algorithm is universally best'],ta:['இந்த host-ல் இந்த application workload பற்றிய வரம்புள்ள முடிவு','எல்லா Internet link-களுக்கும் இதே bandwidth','ஒரு TCP congestion algorithm எங்கும் சிறந்தது']},answer:0,explanation:{en:'The design does not vary physical paths or congestion algorithms.',ta:'இந்த வடிவமைப்பு physical path அல்லது congestion algorithm-ஐ மாற்றிச் சோதிக்கவில்லை.'}}
    ],
    refs:[['Python monotonic clocks','https://docs.python.org/3/library/time.html#time.perf_counter'],['Benchmark methodology for interconnect devices','https://www.rfc-editor.org/rfc/rfc2544.html'],['RFC 2544 applicability limitations','https://www.rfc-editor.org/rfc/rfc6815.html']],
    files:[{name:'benchmark.py',content:String.raw`import argparse, json, platform, random, socket, socketserver
import statistics, threading, time

PAYLOAD = bytes(range(256))*1024
def exact(s, n):
    b = bytearray()
    while len(b) < n:
        part = s.recv(n-len(b))
        if not part: raise EOFError("short echo / முழுமையற்ற echo")
        b.extend(part)
    return bytes(b)
class Echo(socketserver.BaseRequestHandler):
    def handle(self):
        self.request.settimeout(5)
        while True:
            b = self.request.recv(65536)
            if not b: return
            self.request.sendall(b)
def trial(address, batch):
    with socket.create_connection(address, timeout=5) as s:
        start = time.perf_counter()
        for offset in range(0,len(PAYLOAD),batch):
            part = PAYLOAD[offset:offset+batch]; s.sendall(part)
            if exact(s,len(part)) != part: raise ValueError("corrupt echo / echo மாறியுள்ளது")
        seconds = time.perf_counter()-start
    return seconds
def main():
    p = argparse.ArgumentParser(); p.add_argument("--seed",type=int,default=54)
    p.add_argument("--summarize"); a = p.parse_args()
    if a.summarize:
        with open(a.summarize) as f: rows = [json.loads(line) for line in f]
        for batch in (1024,65536):
            values = [r["MB_s"] for r in rows if r.get("kind")=="trial" and r["batch"]==batch]
            if len(values) != 10: raise ValueError("expected ten trials per batch")
            print(json.dumps(dict(batch=batch,n=len(values),median=statistics.median(values),
                                  minimum=min(values),maximum=max(values))))
        return
    print(json.dumps(dict(kind="environment",python=platform.python_version(),
                         platform=platform.platform(),seed=a.seed,bytes=len(PAYLOAD),
                         clock=time.get_clock_info("perf_counter").implementation)),flush=True)
    server = socketserver.TCPServer(("127.0.0.1",0),Echo)
    thread = threading.Thread(target=server.serve_forever,daemon=True); thread.start()
    try:
        for batch in (1024,65536):
            for _ in range(2): trial(server.server_address,batch)
        rng = random.Random(a.seed)
        for pair in range(10):
            batches = [1024,65536]; rng.shuffle(batches)
            for order,batch in enumerate(batches):
                seconds = trial(server.server_address,batch)
                print(json.dumps(dict(kind="trial",pair=pair,order=order,batch=batch,
                                      seconds=seconds,MB_s=len(PAYLOAD)/seconds/1000000)),flush=True)
    finally:
        server.shutdown(); server.server_close(); thread.join()

if __name__ == "__main__": main()
` }]
  }
];
