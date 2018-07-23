using System;
using System.Security.Cryptography;
using System.Text;

namespace VideoMeetups.Logic
{
    public class PasswordManager: IDisposable
    {
        private readonly Guid _encryptionKey = new Guid("AD5BA989-C64D-4E6E-8243-A116904F53EE");
        private readonly HMACSHA256 _encryptor;

        public PasswordManager()
        {
            _encryptor = new HMACSHA256(_encryptionKey.ToByteArray());
        }

        public string GenerateHash(string password)
        {
            return Encoding.UTF8.GetString(_encryptor.ComputeHash(Encoding.UTF8.GetBytes(password)));
        }

        public void Dispose()
        {
            _encryptor.Dispose();
        }
    }
}
