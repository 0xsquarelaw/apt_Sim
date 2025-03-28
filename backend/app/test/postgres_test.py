# postgres_test.py
import psycopg2
import sys

def test_postgres_connection(host='localhost', port=5432, user='postgres', password='password'):
    """Test connection to PostgreSQL server and check if aptsim database exists."""
    
    print(f"Attempting to connect to PostgreSQL server at {host}:{port}...")
    
    try:
        # Connect to default postgres database first
        conn = psycopg2.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            database="postgres"  # Connect to default database
        )
        conn.autocommit = True
        cursor = conn.cursor()
        
        print("✅ Successfully connected to PostgreSQL server!")
        
        # Check PostgreSQL version
        cursor.execute("SELECT version();")
        version = cursor.fetchone()[0]
        print(f"PostgreSQL version: {version}")
        
        # List all databases
        cursor.execute("SELECT datname FROM pg_database;")
        databases = [row[0] for row in cursor.fetchall()]
        
        print("\nAvailable databases:")
        for db in databases:
            print(f"  • {db}")
        
        # Check if aptsim database exists
        if "aptsim" in databases:
            print("\n✅ Database 'aptsim' exists!")
            
            # Try connecting to the aptsim database
            try:
                aptsim_conn = psycopg2.connect(
                    host=host,
                    port=port,
                    user=user,
                    password=password,
                    database="aptsim"
                )
                print("✅ Successfully connected to 'aptsim' database!")
                aptsim_conn.close()
            except Exception as e:
                print(f"❌ Failed to connect to 'aptsim' database: {e}")
        else:
            print("\n❌ Database 'aptsim' does NOT exist!")
            print("Attempting to create the 'aptsim' database...")
            try:
                cursor.execute("CREATE DATABASE aptsim;")
                print("✅ Successfully created 'aptsim' database!")
            except Exception as e:
                print(f"❌ Failed to create database: {e}")

        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # You can modify these parameters if needed
    test_postgres_connection(
        host="localhost", 
        port=5432,
        user="postgres", 
        password="password"  # Replace with your actual password
    )